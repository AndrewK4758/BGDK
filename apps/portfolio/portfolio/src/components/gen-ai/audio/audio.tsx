import type { MRC } from '@bgdk/media-recorder';
import { topLevelModeStyle } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useRef, useState } from 'react';
import { MediaRecorderClientContext } from '../../../contexts/audio-context';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';
import AudioVisualizer from './audio-visualizer';
import HearingIcon from '@mui/icons-material/Hearing';
import { Text } from '@bgdk/react-components';

const audioText =
  'This audio recorder allows you to capture your voice and submit it directly to Gemini.  Use it to create recordings for analysis, transcription, or any other task that can benefit from Gemini\'s powerful AI capabilities. Simply click "Start" to begin.';

const GenAiAudio = () => {
  const { MRC, createStream, stream, setStream } = useContext(MediaRecorderClientContext);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const audRef = useRef<HTMLAudioElement>(null);
  const mrcRef = useRef<MRC | null>(null);

  const uploadFile = () => {
    console.log(blob, 'UPLOAD FILE');
  };

  useEffect(() => {
    if (!stream) createStream(setStream, { audio: true });
    if (stream) {
      mrcRef.current = new MRC(stream, { mimeType: 'audio/webm' });
    }
  }, [stream]);

  useEffect(() => {
    if (audRef.current && blob) {
      const url = URL.createObjectURL(blob as Blob);
      audRef.current.src = url;
    }
    console.log(blob, 'BLOB - USE EFFECT');
  }, [blob]);

  return (
    <Box component={'div'} key={'gen-audio-wrapper'} id="gen-audio-wrapper" sx={topLevelModeStyle}>
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
            <audio autoPlay={true} loop={false} ref={audRef} />
          </Box>

          <Box
            component={'section'}
            key={'gen-audio-recorder-buttons-wrapper'}
            id="gen-audio-recorder-buttons-wrapper"
            sx={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Button onClick={() => uploadFile()} sx={{ fontSize: '2rem' }}>
              Query Gemini
            </Button>

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
