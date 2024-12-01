import { ChatInput } from '@bgdk/react-components';
import { labelSx, textInputSx, topLevelModeStyle } from '@bgdk/shared-react-components';
import type { PromptRequest } from '@bgdk/vertex-ai';
import { FileData } from '@google-cloud/vertexai';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import * as Yup from 'yup';
import { WebSocketContext, WebSocketContextType } from '../../../contexts/websocket-context';
import useScrollIntoView from '../../../hooks/use-scroll-into-view';
import type { OutletContextProps } from '../../../pages/gen-ai/gen-ai';

const validationSchema = Yup.object<PromptRequest>().shape({
  text: Yup.string().required('Must be a valid question or statement').min(2, 'Must be a valid question or statement'),
  fileData: Yup.mixed<FileData>().nullable().notRequired(),
});

const TextGenerator = () => {
  const { socket } = useContext<WebSocketContextType>(WebSocketContext);
  const { prompt, setLoading, setPromptResponse } = useOutletContext<OutletContextProps>();
  const divRef = useRef<HTMLDivElement>(null);

  useScrollIntoView(divRef);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on('connect', () => {
      console.log(`Connected as ${socket.id}`);
    });

    socket.on('chunk', ({ response }) => {
      setPromptResponse(prev => [...prev, response]);
      setLoading(false);
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
        socket.removeAllListeners();
      }
    };
  }, []);

  return (
    <Box
      component={'section'}
      key={'prompt-builder-wrapper'}
      id="prompt-builder-wrapper"
      ref={divRef}
      sx={topLevelModeStyle}
    >
      <Paper component={'div'} key={'prompt-builder-paper'} id="prompt-builder-paper">
        <Container component={'section'} key={'text-input-wrapper'} id="text-input-wrapper" sx={{ paddingY: 2 }}>
          <ChatInput<PromptRequest>
            method="post"
            action=""
            type="text"
            buttonText="Submit Prompt"
            buttonType="submit"
            names={Object.keys(prompt)}
            labelText={'Prompt Input'}
            variant="text"
            socket={socket}
            setLoading={setLoading}
            initialValues={prompt}
            validationSchema={validationSchema}
            breakpointsChatInputButton={{ fontSize: '2rem' }}
            breakpointsChatInputText={textInputSx}
            breakpointsChatInputLabel={labelSx}
            breakpointsWrapperBoxSx={{ width: '100%' }}
          />
        </Container>
      </Paper>
    </Box>
  );
};

export default TextGenerator;
