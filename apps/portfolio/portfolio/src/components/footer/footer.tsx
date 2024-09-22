import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { Dispatch, SetStateAction } from 'react';
import EmailIcon from '../../components/icons/email-icon';

interface FooterProps {
  setOpenEmail: Dispatch<SetStateAction<boolean>>;
}

const Footer = ({ setOpenEmail }: FooterProps) => (
  <Box
    component={'div'}
    key={'footer-text-box'}
    id="footer-text-box"
    sx={{
      flex: '0 1 70%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      zIndex: 1,
    }}
  >
    <Button onClick={() => setOpenEmail(true)} variant="text" sx={{ fontSize: '3rem' }} endIcon={<EmailIcon />}>
      Reach Out
    </Button>
  </Box>
);


export default Footer;
