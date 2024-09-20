import DataObjectTwoToneIcon from '@mui/icons-material/DataObjectTwoTone';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import { type SxProps } from '@mui/material';
import Fab from '@mui/material/Fab';
import Theme from '../../styles/theme';
import AiIcon from '../icons/ai-icon';
import GamesIcon from '../icons/games-icon';
import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
};

const Menus = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
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
              Explore
              <MenuOpenSharpIcon sx={{ fontSize: '3rem' }} />
            </Fab>
          )}

          {open && (
            <Box component={'div'} key={'games-menu-with-close'} id="games-menu-with-close">
              <Fab sx={{ ...buttonSXProps, flex: '0 1 80%' }} color="primary" variant="extended">
                Home
                <HomeIcon />
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
              Games
              <GamesIcon />
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
              Crud
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
