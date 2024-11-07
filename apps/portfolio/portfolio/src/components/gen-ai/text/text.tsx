import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { lazy } from 'react';
import { topLevelModeStyle } from '../gen-ai-modes-styles';

const PromptBuilder = lazy(() => import('./prompt-builder'));

const TextGenerator = () => (
  <Box component={'section'} key={'prompt-builder-wrapper'} id="prompt-builder-wrapper" sx={topLevelModeStyle}>
    <Paper component={'div'} key={'prompt-builder-paper'} id="prompt-builder-paper">
      <Container component={'section'} key={'prompt-builder-form-wrapper'} id="prompt-builder-form-wrapper">
        <PromptBuilder />
      </Container>
    </Paper>
  </Box>
);

export default TextGenerator;
