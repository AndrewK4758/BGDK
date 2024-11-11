import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Theme from '../../../styles/theme';
import * as Yup from 'yup';
import { labelSx, renderPreTagInsideParentDiv, textInputSx, topLevelModeStyle } from '@bgdk/shared-react-components';
import { ChatInput, ChatResponse } from '@bgdk/react-components';
import { useContext, useEffect, useState, type CSSProperties } from 'react';
import { WebSocketContext, WebSocketContextType } from '../../../contexts/websocket-context';
import { useOutletContext } from 'react-router-dom';

const TextGenerator = () => {
  const { socket } = useContext<WebSocketContextType>(WebSocketContext);
  const prompt = useOutletContext() as ChatInputValues | null;
  const [promptResponse, setPromptResponse] = useState<string[]>([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on('connect', () => {
      console.log(`Connected as ${socket.id}`);
    });
    socket.on('chunk', ({ response }) => {
      setPromptResponse(prev => [...prev, response]);
    });
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  type ChatInputValues = {
    prompt: string;
  };

  const chatInitialValues: ChatInputValues = {
    prompt: '',
  };

  const validationSchema = Yup.object({
    prompt: Yup.string()
      .required()
      .min(2, 'Must be a valid question or statement')
      .max(255, 'Must be less than 255 characters'),
  });

  return (
    <Box component={'section'} key={'prompt-builder-wrapper'} id="prompt-builder-wrapper" sx={topLevelModeStyle}>
      <Paper component={'div'} key={'prompt-builder-paper'} id="prompt-builder-paper">
        <Container component={'section'} key={'text-input-wrapper'} id="text-input-wrapper" sx={{ paddingY: 2 }}>
          <ChatInput<ChatInputValues>
            method="post"
            action=""
            type="text"
            buttonText="Submit Prompt"
            buttonType="submit"
            names={Object.keys(chatInitialValues)}
            labelText={'Prompt Input'}
            variant="text"
            socket={socket}
            initialValues={prompt === null ? chatInitialValues : prompt}
            validationSchema={validationSchema}
            breakpointsChatInputButton={{ fontSize: '2rem' }}
            breakpointsChatInputText={textInputSx}
            breakpointsChatInputLabel={labelSx}
            breakpointsWrapperBoxSx={{ width: '100%' }}
          />
        </Container>
        <Container>
          <ChatResponse
            response={promptResponse}
            chatResponseLabelProps={{ textAlign: 'center', color: Theme.palette.secondary.light }}
            chatResponseTextProps={renderPreTagInsideParentDiv as CSSProperties}
          />
        </Container>
      </Paper>
    </Box>
  );
};

export default TextGenerator;
