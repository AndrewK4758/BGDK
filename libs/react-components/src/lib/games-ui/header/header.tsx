import { SxProps } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType } from 'react';
import Text from '../text/text';
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
  titleText: string;
  headerTextVariant: Variant;
  sxAppBar?: SxProps;
  sxText?: SxProps;
}

export function Header({ component, titleText, headerTextVariant, sxAppBar, sxText }: HeaderProps) {
  return (
    <AppBar component={component} sx={sxAppBar}>
      <HeaderMenu breakpointsMenuItem={breakpointsMenuItem} breakpointsMenu={breakpointsMenu} />
      <Text titleVariant={headerTextVariant} titleText={titleText} sx={sxText} />
    </AppBar>
  );
}

export default Header;
