import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { lazy } from 'react';
import { labelSx, textInputSx, topLevelModeStyle } from '../gen-ai-modes-styles';
import { ChatInput } from '@bgdk/react-components';

const PromptBuilder = lazy(() => import('./prompt-builder'));

const TextGenerator = () => (
  <Box component={'section'} key={'prompt-builder-wrapper'} id="prompt-builder-wrapper" sx={topLevelModeStyle}>
    <Paper component={'div'} key={'prompt-builder-paper'} id="prompt-builder-paper">
      <Container component={'section'} key={'prompt-builder-form-wrapper'} id="prompt-builder-form-wrapper">
        <PromptBuilder />
      </Container>
      <Container component={'section'} key={'text-input-wrapper'} id="text-input-wrapper">
        <ChatInput
          method="post"
          action="?index"
          type="text"
          buttonText="Submit Prompt"
          buttonType="submit"
          name="promptInput"
          variant="text"
          breakpointsChatInputButton={{ fontSize: '2rem' }}
          breakpointsChatInputText={{ ...textInputSx, width: '100%' }}
          breakpointsChatInputLabel={{ ...labelSx, fontSize: '3rem', fontFamily: 'League Gothic' }}
          labelText={'Prompt Input'}
        />
      </Container>
    </Paper>
  </Box>
);

export default TextGenerator;
