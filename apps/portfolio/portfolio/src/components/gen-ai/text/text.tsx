import { Box } from '@mui/material';
import PromptBuilder from '../prompt-builder';

const TextGenerator = () => {
  return (
    <Box
      component={'section'}
      key={'prompt-builder-wrapper'}
      id="prompt-builder-wrapper"
      sx={{ height: 'fit-content', minHeight: '30vh' }}
    >
      <PromptBuilder />
    </Box>
  );
};

export default TextGenerator;
