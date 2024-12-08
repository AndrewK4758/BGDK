import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import PrivacyPolicyText from '../../pages/static/privacy-policy-text';
import { baseStyleForLayoutItems } from '../../styles/layout-styles';

/**
 * This component renders the privacy policy page as a modal dialog.
 *
 * @returns {JSX.Element} The rendered PrivacyPolicy component.
 */

export const PrivacyPolicy = (): JSX.Element => {
  const nav = useNavigate();
  return (
    <Box
      component={'div'}
      key={'privacy-policy-wrapper'}
      id="privacy-policy-wrapper"
      sx={{ ...baseStyleForLayoutItems, justifyContent: 'center' }}
    >
      <Modal
        key={'privacy-policy-modal'}
        id={'privacy-policy-modal'}
        open={true}
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
          <PrivacyPolicyText />
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
              onClick={() => nav('/')}
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
