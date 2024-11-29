import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import * as Yup from 'yup';
import { labelSx, textInputSx, topLevelModeStyle } from '@bgdk/shared-react-components';
import { ChatInput } from '@bgdk/react-components';
import { useOutletContext } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { WebSocketContext, WebSocketContextType } from '../../../contexts/websocket-context';
import type { PromptRequest } from '@bgdk/vertex-ai';
import type { OutletContextProps } from '../../../pages/gen-ai/gen-ai';
import { FileData } from '@google-cloud/vertexai';
import useScrollIntoView from '../../../hooks/use-scroll-into-view';

const validationSchema = Yup.object<PromptRequest>().shape({
  text: Yup.string().required('Must be a valid question or statement').min(2, 'Must be a valid question or statement'),
  fileData: Yup.mixed<FileData>().nullable().notRequired(),
});

const TextGenerator = () => {
  const { socket } = useContext<WebSocketContextType>(WebSocketContext);
  const { prompt, setLoading } = useOutletContext<OutletContextProps>();
  const divRef = useRef<HTMLDivElement>(null);

  useScrollIntoView(divRef);

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
