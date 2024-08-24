import Box from '@mui/material/Box';

export const Waiting = () => {
  return (
    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'center' }}>
      <img alt="waiting" src="swirly-dots-to-chrome.webp" width={'128'} />
    </Box>
  );
};

export default Waiting;
