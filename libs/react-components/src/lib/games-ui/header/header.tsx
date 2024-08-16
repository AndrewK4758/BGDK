import { SxProps } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { NormalCssProperties } from '@mui/material/styles/createMixins';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType } from 'react';
import { Link as LinkRR } from 'react-router-dom';
import { Theme } from '../../theme/theme';
import HeaderMenu from './header-menu/header-menu';

/* eslint-disable-next-line */

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

export interface HeaderProps {
  component: ElementType;
  registerLabelText: string;
  headerTextVariant: Variant;
  sxAppBar?: SxProps;
  sxText?: SxProps;
  registerLinkText?: NormalCssProperties;
}

export function Header({ component, registerLabelText, sxAppBar, sxText, registerLinkText }: HeaderProps) {
  return (
    <AppBar component={component} sx={sxAppBar}>
      <HeaderMenu breakpointsMenuItem={breakpointsMenuItem} breakpointsMenu={breakpointsMenu} />
      <Box sx={sxText}>
        <LinkRR to={'/register-user'} style={registerLinkText}>
          {registerLabelText}
        </LinkRR>
      </Box>
    </AppBar>
  );
}

export default Header;
