import { SxProps } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType } from 'react';
import { useActionData } from 'react-router-dom';
import { Theme } from '../../theme/theme';
import Text from '../text/text';
import HeaderMenu from './header-menu/header-menu';
import LoginDrawer from '../login/login-drawer';
import RegisterDrawer from '../register-user/register-drawer';

const breakpointsMenuItem: SxProps = {
  color: Theme.palette.primary.main,
  backgroundColor: Theme.palette.info.main,
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '17px',
  },
};

const breakpointsMenu = {
  [Theme.breakpoints.down('laptop')]: {
    fontSize: '2rem',
  },
};

export interface ActiveUserData {
  playerName: string;
  friends: string[];
  activeGames: string[];
  thumbnail: string;
}

export interface HeaderProps {
  component: ElementType;
  registerLabelText: string;
  headerTextVariant: Variant;
  sxAppBar?: SxProps;
  sxText?: SxProps;
  registerLinkText?: SxProps;
  componentLogin: ElementType;
  componentRegister: ElementType;
  toPropRegister: string;
}

export const Header = ({
  component,
  registerLabelText,
  sxAppBar,
  sxText,
  registerLinkText,
  componentLogin,
  componentRegister,
  toPropRegister,
}: HeaderProps) => {
  const action = useActionData() as ActiveUserData;

  return (
    <AppBar component={component} sx={sxAppBar}>
      <HeaderMenu breakpointsMenuItem={breakpointsMenuItem} breakpointsMenu={breakpointsMenu} />
      <Box component={componentLogin} sx={{ ...sxText }}>
        {action && action.playerName && (
          <Text titleText={`Welcome ${action.playerName}`} titleVariant="h2" sx={{ textAlign: 'center' }} />
        )}
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
