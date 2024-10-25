import Box from '@mui/material/Box';

export const Waiting = () => (
  <Box component={'div'} sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}>
    <img alt="waiting" src="swirly-dots-to-chrome.webp" width={'50%'} height={'auto'} />
  </Box>
);
