// import Svg from './svg';
import AlternateEmailTwoToneIcon from '@mui/icons-material/AlternateEmailTwoTone';
import DataObjectTwoToneIcon from '@mui/icons-material/DataObjectTwoTone';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import { Card, CardContent, CardMedia, List, Paper, type SxProps } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import '../../styles/layout.css';
import AiIcon from '../icons/ai-icon';
import GamesIcon from '../icons/games-icon';
import { Fragment } from 'react';
import Theme from '../../styles/theme';
import GitHibIcon from '../icons/github';
import FacebookIcon from '../icons/facebook-icon';
import LinkedinIcon from '../icons/linkedin-logo';
import HuggingFaceIcon from '../icons/huggingface-icon';
import XIcon from '../icons/x-logo';
import DiscordIcon from '../icons/discord-icon';
import self from '../../assets/self.webp';

//-----------------------------------------------------------------------------------------------------------------

const cubeSxProps: SxProps = {
  position: 'fixed',
  zIndex: 2,
  width: 'fit-content',
  maxWidth: '350px',
  minWidth: '12%',
  height: '8%',
  maxHeight: '200px',
};

const buttonSXProps: SxProps = {
  fontSize: '3rem',
  width: '100%',
};

const iconSxProps: SxProps = {
  flex: '1 0 16%',
};

const headerWrapperSxProps: SxProps = {
  position: 'relative',
  flex: '0 1 18%',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
};

const socialMediaLinksWrapper: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  textAlign: 'center',
  flex: '0 1 70%',
};
const Layout = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Fragment>
      <Box component={'div'} className="main-wrapper-background" key={'app-wrapper'} />
      <Box component={'header'} key={'header'} id="header" zIndex={2} position={'static'} sx={headerWrapperSxProps}>
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
      </Box>
      <Box
        component={'main'}
        key={'main'}
        id="main-wrapper"
        sx={{
          position: 'static',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          flex: '1 0 64%',
          paddingY: '2%',
        }}
      >
        <Paper component={'section'} key={'main-intro-wrapper'} id="main-intro-wrapper" sx={{ display: 'flex' }}>
          <Card component={'span'} key={'main-intro-card'} id="main-info-card" sx={{ flex: '1 0 30%', height: 'auto' }}>
            <CardContent>
              <Typography variant="h1" key={'main-intro-text'} id="main-intro-text" sx={{ letterSpacing: 1.5 }}>
                Hi, I'm Andrew Klapper
              </Typography>
            </CardContent>
            <CardMedia>
              <img
                src={self}
                loading="lazy"
                alt="andrew"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 100,
                  border: `5px solid ${Theme.palette.primary.light}`,
                }}
              />
            </CardMedia>
          </Card>
          <Box component={'span'} key={'main-info-text'} id="main-info-text" sx={{ flex: '1 0 70%' }}>
            <Typography variant="h3" sx={{}}>
              I'm a Full-Stack web developer looking to turn your ideas and inspirations into a digital reality by
              taking what makes your business special, and translating that into web based experience you and your
              clients will enjoy.
            </Typography>
            <List component={'ul'}></List>
          </Box>
        </Paper>
      </Box>
      <Box
        component={'footer'}
        key={'footer'}
        id="footer-wrapper"
        sx={{
          position: 'static',
          flex: '0 1 18%',
          bottom: 0,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Box component={'div'} key={'footer-text-box'} id="footer-text-box" sx={{ flex: '0 1 70%' }}>
          <Typography variant="h3" color="warning" textAlign={'center'}>
            FOOTER
          </Typography>
        </Box>
      </Box>
      <Fragment key={'menu-wrapper'}>
        <Box
          component={'div'}
          className={`menuBox`}
          key={'top-left-header'}
          id="top-left-header"
          top={'2%'}
          left={'2%'}
          sx={cubeSxProps}
        >
          <Box
            component={'div'}
            key={'top-left-button-wrapper'}
            id="top-left-button-wrapper"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {!open && (
              <Fab sx={buttonSXProps} variant="extended" color="primary" onClick={() => setOpen(!open)}>
                Projects
                <MenuOpenSharpIcon sx={{ fontSize: '3rem' }} />
              </Fab>
            )}

            {open && (
              <Box component={'div'} key={'games-menu-with-close'} id="games-menu-with-close">
                <Fab sx={{ ...buttonSXProps, flex: '0 1 80%' }} color="primary" variant="extended">
                  Games
                  <GamesIcon />
                </Fab>

                <Typography
                  variant="subtitle1"
                  onClick={() => setOpen(!open)}
                  color={Theme.palette.secondary.light}
                  sx={{ cursor: 'pointer', fontSize: '1.2rem', textAlign: 'right', flex: '0 1 20%' }}
                >
                  Close Menu
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        {open && (
          <>
            <Box
              component={'div'}
              className={`menuBoxTopRight ${open ? 'animate' : ''}`}
              key={'top-right-header'}
              id="top-right-header"
              top={'2%'}
              right={'2%'}
              sx={cubeSxProps}
            >
              <Fab
                className={`menuButton ${open ? 'animate' : ''}`}
                color="primary"
                variant="extended"
                sx={buttonSXProps}
              >
                Contact
                <AlternateEmailTwoToneIcon sx={{ fontSize: '3rem' }} />
              </Fab>
            </Box>
            <Box
              component={'div'}
              className={`menuBoxBottomLeft ${open ? 'animate' : ''}`}
              key={'bottom-left-header'}
              id="bottom-left-header"
              bottom={'2%'}
              left={'2%'}
              sx={cubeSxProps}
            >
              <Fab
                className={`menuButton ${open ? 'animate' : ''}`}
                sx={buttonSXProps}
                color="primary"
                variant="extended"
              >
                Data
                <DataObjectTwoToneIcon sx={{ fontSize: '3rem' }} />
              </Fab>
            </Box>
            <Box
              component={'div'}
              className={`menuBoxBottomRight ${open ? 'animate' : ''}`}
              key={'bottom-right-header'}
              id="bottom-right-header"
              bottom={'2%'}
              right={'2%'}
              sx={cubeSxProps}
            >
              <Fab
                className={`menuButton ${open ? 'animate' : ''}`}
                sx={buttonSXProps}
                color="primary"
                variant="extended"
              >
                <AiIcon />
              </Fab>
            </Box>
          </>
        )}
      </Fragment>
    </Fragment>
  );
};

export default Layout;
