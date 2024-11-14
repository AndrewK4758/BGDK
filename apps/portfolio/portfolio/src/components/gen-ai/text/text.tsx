import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import * as Yup from 'yup';
import { labelSx, textInputSx, topLevelModeStyle } from '@bgdk/shared-react-components';
import { ChatInput } from '@bgdk/react-components';
import { useOutletContext } from 'react-router-dom';
import { useContext } from 'react';
import { WebSocketContext, WebSocketContextType } from '../../../contexts/websocket-context';

const TextGenerator = () => {
  const { socket } = useContext<WebSocketContextType>(WebSocketContext);
  const prompt = useOutletContext() as ChatInputValues | null;

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
      </Paper>
    </Box>
  );
};

export default TextGenerator;
