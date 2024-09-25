import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { type SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DiscordIcon from '../icons/discord-icon';
import FacebookIcon from '../icons/facebook-icon';
import GitHibIcon from '../icons/github-icon';
import HuggingFaceIcon from '../icons/huggingface-icon';
import LinkedinIcon from '../icons/linkedin-logo';
import XIcon from '../icons/x-logo-icon';
import Theme from '../../styles/theme';
import Button from '@mui/material/Button';
import { useState } from 'react';
import EmailIcon from '../../components/icons/email-icon';
import EmailDialog from '../email/email-dialog';

const iconSxProps: SxProps = {
  flex: '0 1 10%',
};

const socialMediaLinksWrapper: SxProps = {
  position: 'fixed',
  width: '70%',
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  zIndex: 1,
  backgroundColor: Theme.palette.background.paper,
  borderRadius: 5,
  paddingX: 1,
};

const Header = () => {
  const [openEmail, setOpenEmail] = useState<boolean>(false);
  return (
    <Box component={'div'} key={'social-media-icons'} id="social-media-icons" sx={socialMediaLinksWrapper}>
      <Box component={'div'} key={'social-media-text-wrapper'} id="social-media-text-wrapper" sx={{ flex: '0 1 30%' }}>
        <Typography
          variant="h4"
          color="secondary"
          key={'social-media-text'}
          id="social-media-text"
          textAlign={'center'}
        >
          {'Connect & Colab   \u27F6'}
        </Typography>
      </Box>
      <Box
        component={'div'}
        key={'social-media-icon-wrapper'}
        id="social-media-icon-wrapper"
        sx={{ flex: '0 1 40%', display: 'flex', justifyContent: 'space-evenly' }}
      >
        <Box component={'span'} key={'github-icon-span'} id="github-icon-span" sx={iconSxProps}>
          <IconButton href="https://github.com/AndrewK4758">
            <GitHibIcon />
          </IconButton>
        </Box>
        <Box component={'span'} key={'facebook-icon-span'} id="facebook-icon-span" sx={iconSxProps}>
          <IconButton href="https://www.facebook.com/AKlapper47">
            <FacebookIcon />
          </IconButton>
        </Box>
        <Box component={'span'} key={'linkedin-icon-span'} id="likedin-icon-span" sx={iconSxProps}>
          <IconButton href="https://www.linkedin.com/in/andrew-klapper-a9204b23b/">
            <LinkedinIcon />
          </IconButton>
        </Box>
        <Box component={'span'} key={'huggingface-icon-span'} id="huggingface-icon-span" sx={iconSxProps}>
          <IconButton href="https://huggingface.co/ak475826">
            <HuggingFaceIcon />
          </IconButton>
        </Box>
        <Box component={'span'} key={'x-icon-span'} id="x-icon-span" sx={iconSxProps}>
          <IconButton href="https://x.com/ak475826">
            <XIcon />
          </IconButton>
        </Box>
        <Box component={'span'} key={'discord-icon-span'} id="discord-icon-span" sx={iconSxProps}>
          <IconButton href="https://discord.com/users/989564035542446190">
            <DiscordIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        component={'div'}
        key={'footer-email-dialog-wrapper'}
        id="footer-email-dialog-wrapper"
        sx={{ flex: '0 1 30%' }}
      >
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
            color="secondary"
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
    </Box>
  );
};

export default Header;
