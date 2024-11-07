import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { lazy } from 'react';
import { topLevelModeStyle } from '../gen-ai-modes-styles';

const ImageForm = lazy(() => import('./image-form'));

const Image = () => (
  <Box component={'div'} key={'gen-image-wrapper'} id="gen-image-wrapper" sx={topLevelModeStyle}>
    <Paper component={'div'} key={'gen-image-paper'} id="gen-image-paper">
      <Container component={'section'} key={'gen-image-form-wrapper'} id="gen-image-form-wrapper">
        <ImageForm />
      </Container>
    </Paper>
  </Box>
);

export default Image;
