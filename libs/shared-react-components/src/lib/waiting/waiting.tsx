import Box from '@mui/material/Box';

interface WaitingProps {
  src: string;
}

export const Waiting = ({ src }: WaitingProps) => (
  <Box
    component={'div'}
    id="waiting-wrapper"
    test-dataid="waiting-wrapper"
    key="waiting-wrapper"
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    width={'100%'}
    height={'100%'}
  >
    <img
      key={'waiting-image'}
      id={'waiting-image'}
      test-dataid={'waiting-image'}
      alt="waiting"
      src={src}
      style={{ flex: '0 1 50%', height: 'auto' }}
    />
  </Box>
);

export default Waiting;
