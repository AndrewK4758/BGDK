import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { type SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import EmailIcon from '../../components/icons/email-icon';
import EmailDialog from '../email/email-dialog';
import DiscordIcon from '../icons/discord-icon';
import FacebookIcon from '../icons/facebook-icon';
import GitHibIcon from '../icons/github-icon';
import HuggingFaceIcon from '../icons/huggingface-icon';
import LinkedinIcon from '../icons/linkedin-logo';
import XIcon from '../icons/x-logo-icon';

const iconWrapperSxProps: SxProps = {
  flex: '1 0 75%',
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-around',
};

const iconSxProps: SxProps = {
  justifyContent: 'center',
  alignContent: 'center',
  scale: 1.4,
};

const socialMediaLinksWrapper: SxProps = {
  flex: '1 0 100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingX: 1,
};

const Header = () => {
  const [openEmail, setOpenEmail] = useState<boolean>(false);
  return (
    <Paper
      elevation={24}
      component={'div'}
      key={'social-media-icons'}
      id="social-media-icons"
      sx={socialMediaLinksWrapper}
    >
      <Box component={'div'} key={'social-media-text-wrapper'} id="social-media-text-wrapper" flex={'1 0 25%'}>
        <Typography
          variant="h4"
          color="secondary"
          key={'social-media-text'}
          id="social-media-text"
          textAlign={'center'}
        >
          {`Connect & Colab \u27F6`}
        </Typography>
      </Box>
      <Box component={'div'} key={'social-media-icon-wrapper'} id="social-media-icon-wrapper" sx={iconWrapperSxProps}>
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
        <Box component={'span'} key={'email-icon-span'} id="email-icon-span" sx={iconSxProps}>
          <IconButton color="secondary" onClick={() => setOpenEmail(true)} sx={iconSxProps}>
            <EmailIcon />
          </IconButton>
        </Box>
      </Box>
      <Box component={'div'} key={'email-form-wrapper'} id="email-form-wrapper" width={'100%'}>
        <EmailDialog open={openEmail} setOpen={setOpenEmail} />
      </Box>
    </Paper>
  );
};

export default Header;
