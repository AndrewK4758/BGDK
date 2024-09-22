import IconButton from '@mui/material/IconButton';
import DiscordIcon from '../icons/discord-icon';
import FacebookIcon from '../icons/facebook-icon';
import GitHibIcon from '../icons/github-icon';
import HuggingFaceIcon from '../icons/huggingface-icon';
import LinkedinIcon from '../icons/linkedin-logo';
import XIcon from '../icons/x-logo-icon';
import Box from '@mui/material/Box';
import { type SxProps } from '@mui/material';

const iconSxProps: SxProps = {
  flex: '1 0 16%',
};

const socialMediaLinksWrapper: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  textAlign: 'center',
  flex: '0 1 70%',
};

const Header = () => {
  return (
    <Box component={'div'} key={'social-media-icons'} id="social-media-icons" sx={socialMediaLinksWrapper}>
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
  );
};

export default Header;
