import DataObjectTwoToneIcon from '@mui/icons-material/DataObjectTwoTone';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { Fragment, useState, type Dispatch, type JSX, type SetStateAction } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { buttonSXProps, closeMenusStyles, cubeSxProps, menuIconsStyles } from '../../styles/menus-styles';
import { flexColumnStyles } from '../../styles/prompt-builder-styles';
import Theme from '../../styles/theme';
import AiIcon from '../icons/ai-icon';
import GamesIcon from '../icons/games-icon';
import HomeIcon from '../icons/home-icon';

interface MenusProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

/**
 * This component renders the navigation menus for the application.
 * It includes buttons for navigating to different sections of the application, such as Home, Games, CRUD, and Generative AI.
 *
 * @param {MenusProps} props - The props for the Menus component.
 * @param {boolean} props.loading - Whether the application is loading.
 * @param {Dispatch<SetStateAction<boolean>>} props.setLoading - A function to update the loading state.
 * @returns {JSX.Element} The rendered Menus component.
 */

const Menus = ({ setLoading }: MenusProps): JSX.Element => {
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
        <Box component={'div'} key={'top-left-button-wrapper'} id="top-left-button-wrapper" sx={flexColumnStyles}>
          {!open && (
            <Fab
              sx={buttonSXProps}
              id={'explore-button'}
              data-testid={'explore-button'}
              variant="extended"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Explore
              <MenuOpenSharpIcon sx={menuIconsStyles} />
            </Fab>
          )}

          {open && (
            <Box
              component={'div'}
              key={'games-menu-with-close'}
              id="games-menu-with-close"
              sx={{ ...flexColumnStyles, gap: 1 }}
            >
              <Fab
                sx={buttonSXProps}
                color="primary"
                id="home-button"
                data-testid="home-button"
                variant="extended"
                onClick={() => {
                  nav('/');
                  window.scrollTo({ behavior: 'smooth', top: 0 });
                }}
              >
                Home
                <HomeIcon sx={{ fontSize: '2.5rem' }} />
              </Fab>

              <Typography
                variant="caption"
                id={'close-link'}
                data-testid={'close-link'}
                onClick={() => setOpen(false)}
                color={Theme.palette.secondary.contrastText}
                sx={closeMenusStyles}
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
              id="games-button"
              data-testid="games-button"
              variant="extended"
              onClick={() => {
                nav('games');
              }}
              sx={buttonSXProps}
            >
              Games
              <GamesIcon sx={menuIconsStyles} />
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
              id="crud-button"
              data-testid="crud-button"
              variant="extended"
              onClick={() => nav('crud')}
            >
              Crud
              <DataObjectTwoToneIcon sx={menuIconsStyles} />
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
              id="gen-ai-button"
              data-testid="gen-ai-button"
              variant="extended"
              onClick={() => {
                setLoading(true);
                nav('gen-ai');
              }}
            >
              Generative
              <AiIcon sx={menuIconsStyles} />
            </Fab>
          </Box>
        </>
      )}
    </Fragment>
  );
};

export default Menus;
