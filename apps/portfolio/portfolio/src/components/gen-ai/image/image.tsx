import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { lazy } from 'react';

const ImageForm = lazy(() => import('./image-form'));

const Image = () => (
  <Box
    component={'div'}
    key={'gen-image-wrapper'}
    id="gen-image-wrapper"
    sx={{
      minHeight: '30vh',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 5,
      minWidth: '65vw',
      width: 'fit-content',
    }}
  >
    <Paper
      component={'div'}
      key={'gen-image-paper'}
      id="gen-image-paper"
      sx={{
        width: '100%',
        height: '100%',
        gap: 4,
      }}
    >
      <Container component={'section'} key={'gen-image-form-wrapper'} id="gen-image-form-wrapper">
        <ImageForm />
      </Container>
    </Paper>
  </Box>
);

export default Image;
