import { Text } from '@bgdk/shared-react-components';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import EmailIcon from '../../components/icons/email-icon';
import { iconSxProps, iconWrapperSxProps, socialMediaLinksWrapper } from '../../styles/header-styles';
import Theme from '../../styles/theme';
import EmailDialog from '../email/email-dialog';
import DiscordIcon from '../icons/discord-icon';
import FacebookIcon from '../icons/facebook-icon';
import GitHibIcon from '../icons/github-icon';
import HuggingFaceIcon from '../icons/huggingface-icon';
import LinkedinIcon from '../icons/linkedin-logo';
import XIcon from '../icons/x-logo-icon';

const Header = () => {
  const [openEmail, setOpenEmail] = useState<boolean>(false);
  return (
    <Paper
      elevation={24}
      component={'div'}
      key={'social-media-icons'}
      id="social-media-icons"
      data-testid="social-media-icons"
      sx={socialMediaLinksWrapper}
    >
      <Box
        component={'div'}
        key={'social-media-text-wrapper'}
        id="social-media-text-wrapper"
        data-testid="social-media-text-wrapper"
        flex={'1 0 25%'}
      >
        <Text
          component={'h4'}
          titleVariant="h4"
          sx={{ color: Theme.palette.secondary.main, textAlign: 'center' }}
          key={'social-media-text'}
          id="social-media-text"
          data-testid="social-media-text"
          titleText={`Connect & Colab \u27F6`}
        />
      </Box>
      <Box
        component={'div'}
        key={'social-media-icon-wrapper'}
        id="social-media-icon-wrapper"
        data-testid="social-media-icon-wrapper"
        sx={iconWrapperSxProps}
      >
        <Box
          component={'span'}
          key={'github-icon-span'}
          id="github-icon-span"
          data-testid="github-icon-span"
          sx={iconSxProps}
        >
          <IconButton
            key={'github-icon'}
            id="github-icon"
            data-testid="github-icon"
            href="https://github.com/AndrewK4758"
          >
            <GitHibIcon sx={{ scale: 1.25 }} />
          </IconButton>
        </Box>
        <Box
          component={'span'}
          key={'facebook-icon-span'}
          id="facebook-icon-span"
          data-testid="facebook-icon-span"
          sx={iconSxProps}
        >
          <IconButton
            key={'facebook-icon'}
            id="facebook-icon"
            data-testid="facebook-icon"
            href="https://www.facebook.com/AKlapper47"
          >
            <FacebookIcon sx={{ scale: 1.25 }} />
          </IconButton>
        </Box>
        <Box
          component={'span'}
          key={'linkedin-icon-span'}
          id="likedin-icon-span"
          data-testid="likedin-icon-span"
          sx={iconSxProps}
        >
          <IconButton
            key={'linkedin-icon'}
            id="linkedin-icon"
            data-testid="linkedin-icon"
            href="https://www.linkedin.com/in/andrew-klapper-a9204b23b/"
          >
            <LinkedinIcon sx={{ scale: 1.25 }} />
          </IconButton>
        </Box>
        <Box
          component={'span'}
          key={'huggingface-icon-span'}
          id="huggingface-icon-span"
          data-testid="huggingface-icon-span"
          sx={iconSxProps}
        >
          <IconButton
            key={'huggingface-icon'}
            id="huggingface-icon"
            data-testid="huggingface-icon"
            href="https://huggingface.co/ak475826"
          >
            <HuggingFaceIcon sx={{ scale: 1.5 }} />
          </IconButton>
        </Box>
        <Box component={'span'} key={'x-icon-span'} id="x-icon-span" data-testid="x-icon-span" sx={iconSxProps}>
          <IconButton key={'x-icon'} id="x-icon" data-testid="x-icon" href="https://x.com/ak475826">
            <XIcon sx={{ scale: 1 }} />
          </IconButton>
        </Box>
        <Box
          component={'span'}
          key={'discord-icon-span'}
          id="discord-icon-span"
          data-testid="discord-icon-span"
          sx={iconSxProps}
        >
          <IconButton
            key={'discord-icon'}
            id="discord-icon"
            data-testid="discord-icon"
            href="https://discord.com/users/989564035542446190"
          >
            <DiscordIcon sx={{ scale: 1.25 }} />
          </IconButton>
        </Box>
        <Box
          component={'span'}
          key={'email-icon-span'}
          id="email-icon-span"
          data-testid="email-icon-span"
          sx={iconSxProps}
        >
          <IconButton color="secondary" id="email-icon" data-testid="email-icon" onClick={() => setOpenEmail(true)}>
            <EmailIcon sx={{ scale: 1.25 }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        component={'div'}
        key={'email-form-wrapper'}
        id="email-form-wrapper"
        data-testid="email-form-wrapper"
        width={'100%'}
      >
        <EmailDialog open={openEmail} setOpen={setOpenEmail} />
      </Box>
    </Paper>
  );
};

export default Header;
