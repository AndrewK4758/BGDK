import { topLevelModeStyle } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { lazy, useRef } from 'react';
import useScrollIntoView from '../../../hooks/use-scroll-into-view';

const ImageForm = lazy(() => import('./image-form'));

const Image = () => {
  const divRef = useRef<HTMLDivElement>(null);
  useScrollIntoView(divRef);
  return (
    <Box component={'div'} key={'gen-image-wrapper'} id="gen-image-wrapper" ref={divRef} sx={topLevelModeStyle}>
      <Paper component={'div'} key={'gen-image-paper'} id="gen-image-paper">
        <Container component={'section'} key={'gen-image-form-wrapper'} id="gen-image-form-wrapper">
          <ImageForm />
        </Container>
      </Paper>
    </Box>
  );
};
export default Image;
