import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { lazy, useContext, useEffect, useState } from 'react';
import setSocketListeners from '../../../../../../portfolio/portfolio/src/utils/web-socket/set-socket-listeners';
import {
  labelSx,
  tooltipSx,
  topLevelModeStyle,
} from '../../../../../../portfolio/portfolio/src/components/gen-ai/gen-ai-modes-styles';
import ModelResponse from './local-model-response';
import { WebsocketContext } from '../../../../../../portfolio/portfolio/src/contexts/websocket-context';
import { Label } from '@bgdk/shared-react-components';

const ModelQuery = lazy(() => import('./local-model-query'));

export const LocalModel = () => {
  const { socket } = useContext(WebsocketContext);
  const [promptResponse, setPromptResponse] = useState<string>('');

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    setSocketListeners(socket, [
      ['connect', () => console.log(`Connected on id: ${socket.id}`)],
      ['promptResponse', response => setPromptResponse(response as string)],
      ['promptResponseError', error => console.log(error)],
    ]);

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Box key={'local-model-wrapper-box'} id="local-model-wrapper-box" sx={topLevelModeStyle}>
      <Paper
        key={'local-model-wrapper-paper'}
        id="local-model-wrapper-paper"
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', gap: '5vh' }}
      >
        <Container
          key={'local-model-wrapper-query-container'}
          id="local-model-wrapper-query-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'fit-content',
          }}
        >
          <ModelQuery />
        </Container>

        <Container
          key={'local-model-wrapper-response-container'}
          id="local-model-wrapper-response-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Label
            placement="top"
            tooltipTitle={'Response from local model'}
            labelVariant="h3"
            labelText="Response"
            sx={{ ...labelSx, textAlign: 'center', width: '100%' }}
            tooltipSx={tooltipSx}
          />
          <ModelResponse promptResponse={promptResponse} />
        </Container>
      </Paper>
    </Box>
  );
};
export default LocalModel;
