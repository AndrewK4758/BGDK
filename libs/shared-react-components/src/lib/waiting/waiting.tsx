import Box from '@mui/material/Box';

export const Waiting = () => (
  <Box
    component={'div'}
    sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%', height: '100%' }}
  >
    <img alt="waiting" src="swirly-dots-to-chrome.webp" style={{ flex: '0 1 50%', height: 'auto' }} />
  </Box>
);
