// import styles from '../../../styles/prompt-builder-response.module.css';
import { renderPreTagInsideParentDiv, Text } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import type { CSSProperties } from 'react';
import { fullSizeBlock } from '../../../styles/pages-styles';

interface PromptBuilderResponseProps {
  prompt: string;
}

/**
 * This component renders the generated prompt in a formatted way.
 *
 * @param {PromptBuilderResponseProps} props - The props for the PromptBuilderResponse component.
 * @param {string} props.prompt - The generated prompt.
 * @returns {JSX.Element} The rendered PromptBuilderResponse component.
 */

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
