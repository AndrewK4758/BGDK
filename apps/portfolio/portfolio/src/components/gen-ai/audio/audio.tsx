import type { MRC } from '@bgdk/media-recorder';
import { Text } from '@bgdk/react-components';
import { topLevelModeStyle } from '@bgdk/shared-react-components';
import type { PromptRequest } from '@bgdk/vertex-ai';
import HearingIcon from '@mui/icons-material/Hearing';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useContext, useEffect, useRef, useState, type RefObject } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MediaRecorderClientContext } from '../../../contexts/audio-context';
import { WebSocketContext } from '../../../contexts/websocket-context';
import useScrollIntoView from '../../../hooks/use-scroll-into-view';
import type { OutletContextProps } from '../../../pages/gen-ai/gen-ai';
import AudioVisualizer from './audio-visualizer';

const audioText =
  'This audio recorder allows you to capture your voice and submit it directly to Gemini.  Use it to create recordings for analysis, transcription, or any other task that can benefit from Gemini\'s powerful AI capabilities. Simply click "Start" to begin.';

const options: MediaRecorderOptions = {
  mimeType: 'audio/webm',
};

const GenAiAudio = () => {
  const { socket } = useContext(WebSocketContext);
  const { MRC, createStream, stream, setStream } = useContext(MediaRecorderClientContext);
  const { setPromptResponse } = useOutletContext<OutletContextProps>();
  const [blob, setBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const audRef = useRef<HTMLAudioElement>(null);
  const mrcRef = useRef<MRC | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useScrollIntoView(divRef);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on('chunk', ({ response }) => {
      setPromptResponse(prev => [...prev, response]);
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
        socket.removeAllListeners();
      }
    };
  }, []);

  useEffect(() => {
    if (!stream) createStream(setStream, { audio: true, video: false });
    if (stream) {
      mrcRef.current = new MRC(stream, options);
    }
  }, [stream]);

  useEffect(() => {
    if (audRef.current && blob) {
      const url = URL.createObjectURL(blob as Blob);
      audRef.current.src = url;
    }
  }, [blob]);

  const uploadFile = async () => {
    if (blob) {
      const path = await handleFileUpload(audRef, blob);

      const promptData: PromptRequest = {
        fileData: {
          fileUri: path,
          mimeType: blob.type,
        },

        text: null,
      };

      socket.emit('prompt', promptData);
    }
  };

  return (
    <Box component={'div'} key={'gen-audio-wrapper'} id="gen-audio-wrapper" ref={divRef} sx={topLevelModeStyle}>
      <Paper
        component={'div'}
        key={'gen-audio-paper'}
        id="gen-audio-paper"
        sx={{ flex: '1 0 100%', display: 'flex', flexDirection: 'column' }}
      >
        <Container
          component={'section'}
          key={'gen-audio-container'}
          id="gen-audio-container"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
            flex: '1 0 100%',
            paddingY: 2,
          }}
        >
          <Box
            component={'section'}
            key={'gen-audio-header-wrapper'}
            id={'gen-audio-header-wrapper'}
            sx={{ flex: '0 1 100%' }}
          >
            <Text titleVariant="h3" sx={{ textAlign: 'center', paddingY: 2 }} titleText={'Audio'} />

            <Text titleVariant="body1" sx={{}} titleText={audioText} />
          </Box>
          <Box
            component={'section'}
            key={'gen-audio-recorder-wrapper'}
            id="gen-audio-recorder-wrapper"
            sx={{ flex: '1 0 100%' }}
          >
            {recording && <AudioVisualizer stream={stream as MediaStream} />}
            <audio title="audio-track.webm" ref={audRef} />
          </Box>

          <Box
            component={'section'}
            key={'gen-audio-recorder-buttons-wrapper'}
            id="gen-audio-recorder-buttons-wrapper"
            sx={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            {blob && (
              <Button onClick={() => uploadFile()} sx={{ fontSize: '2rem' }}>
                Query Gemini
              </Button>
            )}

            <Button
              endIcon={<MicNoneIcon sx={{ scale: 2 }} />}
              onClick={() => {
                mrcRef.current?.startRecording(setBlob);
                setRecording(true);
              }}
              sx={{ fontSize: '2rem' }}
            >
              Start
            </Button>

            <Button
              endIcon={<MicOffIcon sx={{ scale: 2 }} />}
              onClick={() => {
                mrcRef.current?.stopRecording();
                setRecording(false);
              }}
              sx={{ fontSize: '2rem' }}
            >
              Stop
            </Button>

            <Button
              endIcon={<HearingIcon sx={{ scale: 2 }} />}
              onClick={() => audRef.current?.play()}
              sx={{ fontSize: '2rem' }}
            >
              Listen
            </Button>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default GenAiAudio;

const baseUrl = import.meta.env.VITE_SERVER_URL_VERTEX;

const handleFileUpload = async (fileInputRef: RefObject<HTMLAudioElement>, blob: Blob) => {
  try {
    if (fileInputRef.current) {
      const file = new File([blob], fileInputRef.current.title);
      const contextPath = sessionStorage.getItem('context-path');
      const resp = await axios.post(
        `${baseUrl}/upload`,
        { file: file, contextPath: contextPath },
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      const { path } = resp.data;

      return path;
    }
  } catch (error) {
    console.error(error);
  }
};
