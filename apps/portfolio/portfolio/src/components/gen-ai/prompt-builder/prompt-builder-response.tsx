// import styles from '../../../styles/prompt-builder-response.module.css';
import { renderPreTagInsideParentDiv, Text } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import type { CSSProperties } from 'react';
import { fullSizeBlock } from '../../../styles/pages-styles';

interface PromptBuilderResponseProps {
  prompt: string;
}

export const PromptBuilderResponse = ({ prompt }: PromptBuilderResponseProps) => (
  <Box sx={fullSizeBlock}>
    <Text
      key={'prompt-response-text'}
      id="prompt-response-text"
      component={'p'}
      titleVariant="body1"
      titleText={<pre style={renderPreTagInsideParentDiv as CSSProperties}>{prompt}</pre>}
    />
  </Box>
);

export default PromptBuilderResponse;
