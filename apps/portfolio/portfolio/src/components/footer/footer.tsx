import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box component={'div'} key={'footer-text-box'} id="footer-text-box" sx={{ flex: '0 1 70%' }}>
      <Typography variant="h3" color="warning" textAlign={'center'}>
        FOOTER
      </Typography>
    </Box>
  );
};

export default Footer;
