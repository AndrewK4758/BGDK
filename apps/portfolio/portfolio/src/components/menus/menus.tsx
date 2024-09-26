import DataObjectTwoToneIcon from '@mui/icons-material/DataObjectTwoTone';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import { type SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Theme from '../../styles/theme';
import AiIcon from '../icons/ai-icon';
import GamesIcon from '../icons/games-icon';
import HomeIcon from '../icons/home-icon';

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
  color: Theme.palette.background.default,
};

const Menus = () => {
  const [open, setOpen] = useState<boolean>(false);
  const nav: NavigateFunction = useNavigate();

  return (
    <Fragment key={'menu-wrapper'}>
      <Box
        component={'div'}
        className={`menuBox`}
        key={'top-left-menu'}
        id="top-left-menu"
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
            <Fab sx={buttonSXProps} variant="extended" color="primary" onClick={() => setOpen(true)}>
              Explore
              <MenuOpenSharpIcon sx={{ fontSize: '3rem' }} />
            </Fab>
          )}

          {open && (
            <Box component={'div'} key={'games-menu-with-close'} id="games-menu-with-close">
              <Fab
                sx={{ ...buttonSXProps, flex: '0 1 80%' }}
                color="primary"
                variant="extended"
                onClick={() => {
                  nav('/');
                  window.scrollTo({ behavior: 'smooth', top: 0 });
                }}
              >
                Home
                <HomeIcon />
              </Fab>

              <Typography
                variant="subtitle1"
                onClick={() => setOpen(false)}
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
            key={'top-right-menu'}
            id="top-right-menu"
            top={'2%'}
            right={'2%'}
            sx={cubeSxProps}
          >
            <Fab
              className={`menuButton ${open ? 'animate' : ''}`}
              color="primary"
              variant="extended"
              onClick={() => {
                nav('games');
              }}
              sx={buttonSXProps}
            >
              Games
              <GamesIcon />
            </Fab>
          </Box>
          <Box
            component={'div'}
            className={`menuBoxBottomLeft ${open ? 'animate' : ''}`}
            key={'bottom-left-menu'}
            id="bottom-left-menu"
            bottom={0}
            left={'2%'}
            sx={cubeSxProps}
          >
            <Fab
              className={`menuButton ${open ? 'animate' : ''}`}
              sx={buttonSXProps}
              color="primary"
              variant="extended"
              onClick={() => nav('crud')}
            >
              Crud
              <DataObjectTwoToneIcon sx={{ fontSize: '3rem' }} />
            </Fab>
          </Box>
          <Box
            component={'div'}
            className={`menuBoxBottomRight ${open ? 'animate' : ''}`}
            key={'bottom-right-menu'}
            id="bottom-right-menu"
            bottom={0}
            right={'2%'}
            sx={cubeSxProps}
          >
            <Fab
              className={`menuButton ${open ? 'animate' : ''}`}
              sx={buttonSXProps}
              color="primary"
              variant="extended"
              onClick={() => nav('gen-ai')}
            >
              Generative
              <AiIcon />
            </Fab>
          </Box>
        </>
      )}
    </Fragment>
  );
};

export default Menus;
