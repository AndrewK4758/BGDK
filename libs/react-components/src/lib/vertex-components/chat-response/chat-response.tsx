// import styles from './chat-response.module.css';
import { Label } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import type { CSSProperties } from 'react';

const tooltipTitle = 'Response from text query';

interface ChatResponseProps {
  response: string | string[];
  chatResponseLabelProps: SxProps;
  chatResponseTextProps: CSSProperties;
}

export function ChatResponse({ response, chatResponseLabelProps, chatResponseTextProps }: ChatResponseProps) {
  return (
    <Box
      key={'chat-response-wrapper-box'}
      id="chat-response-wrapper-box"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box key={'chat-response-label-box'} id="chat-response-label-box">
        <Label
          placement="top"
          tooltipTitle={tooltipTitle}
          labelVariant={'h3'}
          labelText={'Query Response'}
          sx={chatResponseLabelProps}
        />
      </Box>
      <Box key={'chat-response-box'} id="chat-response-wrapper-box" sx={{ width: '100%' }}>
        <pre style={chatResponseTextProps}>{response}</pre>
      </Box>
    </Box>
  );
}

export default ChatResponse;
