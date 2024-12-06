import Box from '@mui/material/Box';

export const Waiting = () => (
  <Box
    component={'div'}
    id="waiting-wrapper"
    test-dataid="waiting-wrapper"
    key="waiting-wrapper"
    sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%', height: '100%' }}
  >
    <img
      key={'waiting-image'}
      id={'waiting-image'}
      test-dataid={'waiting-image'}
      alt="waiting"
      src="swirly-dots-to-chrome.webp"
      style={{ flex: '0 1 50%', height: 'auto' }}
    />
  </Box>
);

export default Waiting;
