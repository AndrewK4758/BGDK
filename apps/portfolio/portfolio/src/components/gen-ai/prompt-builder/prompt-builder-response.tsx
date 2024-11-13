import type { CSSProperties } from 'react';
// import styles from '../../../styles/prompt-builder-response.module.css';
import { renderPreTagInsideParentDiv } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PromptBuilderResponseProps {
  prompt: string;
}

export function PromptBuilderResponse({ prompt }: PromptBuilderResponseProps) {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography component={'div'} variant="body1">
        <pre style={renderPreTagInsideParentDiv as CSSProperties}>{prompt}</pre>
      </Typography>
    </Box>
  );
}

export default PromptBuilderResponse;
