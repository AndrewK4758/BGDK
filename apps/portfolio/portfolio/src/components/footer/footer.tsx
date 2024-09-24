import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import EmailIcon from '../../components/icons/email-icon';
import EmailDialog from '../email/email-dialog';

const Footer = () => {
  const [openEmail, setOpenEmail] = useState<boolean>(false);
  return (
    <Box component={'div'} key={'footer-email-dialog-wrapper'} id="footer-email-dialog-wrapper">
      <Box
        component={'div'}
        key={'footer-text-box'}
        id="footer-text-box"
        sx={{
          flex: '0 1 70%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          height: 'fit-content',
        }}
      >
        <Button
          onClick={() => setOpenEmail(true)}
          variant="text"
          sx={{ fontSize: '2rem' }}
          endIcon={<EmailIcon />}
          style={{ zIndex: 1, maxHeight: '60px' }}
        >
          Feel Free to Reach Out
        </Button>
      </Box>
      <Box component={'div'} key={'email-form-wrapper'} id="email-form-wrapper" width={'100%'}>
        <EmailDialog open={openEmail} setOpen={setOpenEmail} />
      </Box>
    </Box>
  );
};


export default Footer;
