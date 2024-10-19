import Box from '@mui/material/Box';
import Theme from '../../styles/theme';
import Paper from '@mui/material/Paper';
import { Text } from '@bgdk/react-components';

const PromptBuilder = () => {
  console.log('prompt builder');
  return (
    <Box component={'div'} key={'prompt-builder-wrapper'} id="prompt-builder-wrapper" sx={{ width: '100%' }}>
      <Paper
        key={'prompt-builder-paper'}
        id="prompt-builder-paper"
        sx={{ width: '100%', height: 'fit-content', minHeight: '30vh' }}
      >
        <Box component={'section'} key={'prompt-builder-main'} id="prompt-builder-main" sx={{ width: '100%' }}>
          <Text titleVariant="h2" titleText={'Prompt Builder'} sx={{ width: '100%', textAlign: 'center' }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default PromptBuilder;
