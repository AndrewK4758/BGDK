import type { MRC } from '@bgdk/media-recorder';
import { topLevelModeStyle } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useRef, useState } from 'react';
import { MediaRecorderClientContext } from '../../../contexts/audio-context';

const GenAiAudio = () => {
  const { MRC, stream, createStream, setStream } = useContext(MediaRecorderClientContext);
  const [blob, setBlob] = useState<Blob | null>(null);
  const audRef = useRef<HTMLAudioElement>(null);
  const mrcRef = useRef<MRC | null>(null);

  const uploadFile = () => {
    console.log(blob, 'UPLOAD FILE');
  };

  useEffect(() => {
    createStream(setStream, { audio: true });
    console.log(blob, 'BLOB - USE EFFECT');
  }, []);

  useEffect(() => {
    if (stream) {
      mrcRef.current = new MRC(stream, { mimeType: 'audio/webm' });
      console.log(stream);
    }
  }, [stream]);

  useEffect(() => {
    if (audRef.current && blob) {
      const url = URL.createObjectURL(blob as Blob);
      audRef.current.src = url;
    }
  }, [blob]);
  return (
    <Box component={'div'} key={'gen-image-wrapper'} id="gen-image-wrapper" sx={topLevelModeStyle}>
      <Paper component={'div'} key={'gen-image-paper'} id="gen-image-paper" sx={{ width: '100%', height: 'auto' }}>
        <Container component={'section'} key={'gen-image-form-wrapper'} id="gen-image-form-wrapper"></Container>
        <audio autoPlay={true} loop={false} ref={audRef} style={{ width: '100%', height: 'auto' }} />
        <Box>
          <Button onClick={() => uploadFile()}>Send To Gemini</Button>

          <Button onClick={() => mrcRef.current?.startRecording(setBlob)}>Start Recording</Button>

          <Button onClick={() => mrcRef.current?.stopRecording()}>Stop Recording</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default GenAiAudio;
