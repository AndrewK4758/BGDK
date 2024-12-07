import { Text } from '@bgdk/shared-react-components';
import { SxProps } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ElementType, useContext, useEffect } from 'react';
import { Theme } from '../../theme/theme';
import { ActiveUserContext } from '../context/active-user-context';
import LoginDrawer from '../login/login-drawer';
import RegisterDrawer from '../register-user/register-drawer';
import HeaderMenu from './header-menu/header-menu';

const breakpointsMenuItem: SxProps = {
  color: Theme.palette.primary.main,
  backgroundColor: Theme.palette.info.main,
  width: '100%',
  [Theme.breakpoints.down('md')]: {
    fontSize: '17px',
  },
};

const breakpointsMenu: SxProps = {
  [Theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
};

export interface ActiveUserData {
  id: string | undefined;
  playerName: string | undefined;
  friends: string[] | undefined;
  activeGames: string[] | undefined;
  thumbnail: string | undefined;
}

export interface HeaderProps {
  componentAppBar: ElementType;
  componentLogin: ElementType;
  componentRegister: ElementType;
  sxAppBar?: SxProps;
  sxText?: SxProps;
}

export const Header = ({ componentAppBar, componentLogin, componentRegister, sxAppBar, sxText }: HeaderProps) => {
  const activeUser = useContext(ActiveUserContext);

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(activeUser.activeUser));
  }, [activeUser.activeUser, activeUser.setActiveUser]);
  return (
    <AppBar component={componentAppBar} sx={sxAppBar}>
      <HeaderMenu breakpointsMenuItem={breakpointsMenuItem} breakpointsMenu={breakpointsMenu} />
      <Box component={componentLogin} sx={sxText}>
        <Box sx={{ flex: '1 0 50%' }}>
          {activeUser.activeUser.playerName && (
            <Text
              component={'h2'}
              titleText={`Welcome ${activeUser.activeUser.playerName}`}
              titleVariant="h2"
              sx={{ fontSize: '52px' }}
            />
          )}
        </Box>
        <Box sx={{ flex: '1 0 50%' }}>
          {activeUser.activeUser.thumbnail && (
            <img
              src={activeUser.activeUser.thumbnail}
              alt="active avatar"
              style={{
                width: '70px',
                height: 'auto',
                flex: '1 0 50%',
                alignSelf: 'center',
                borderRadius: '45px',
              }}
            />
          )}
        </Box>
      </Box>
      <Box
        component={componentRegister}
        sx={{ ...sxText, flex: '0 1 18%', display: 'flex', alignItems: 'space-evenly' }}
      >
        <LoginDrawer />
        <RegisterDrawer />
      </Box>
    </AppBar>
  );
};

export default Header;
