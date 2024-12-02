import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseStyleForLayoutItems } from '../layout/layout';
import Button from '@mui/material/Button';
import PrivacyPolicyText from '../../pages/static/privacy-policy-text';

export const PrivacyPolicy = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box
      component={'div'}
      key={'privacy-policy-wrapper'}
      id="privacy-policy-wrapper"
      sx={{ ...baseStyleForLayoutItems, justifyContent: 'center' }}
    >
      <Link to={''} onClick={() => setOpen(true)}>
        Privacy Policy
      </Link>
      <Modal
        key={'privacy-policy-modal'}
        id={'privacy-policy-modal'}
        open={open}
        sx={{
          height: '90vh',
          width: '90vw',
          top: '5%',
          left: '5%',
          overflowY: 'scroll',
        }}
      >
        <Box
          component={'section'}
          key={'privacy-policy-modal-wrapper'}
          id={'privacy-policy-modal-wrapper'}
          sx={{ backgroundColor: '#d1d1d1' }}
        >
          {PrivacyPolicyText}
          <Box
            component={'section'}
            key={'privacy-policy-button-wrapper'}
            id={'privacy-policy-button-wrapper'}
            display={'flex'}
            justifyContent={'flex-end'}
            paddingX={6}
          >
            <Button
              key={'privacy-policy-button'}
              id={'privacy-policy-button'}
              color="secondary"
              onClick={() => setOpen(false)}
              sx={{ fontSize: '1.5rem' }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default PrivacyPolicy;
