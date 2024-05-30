import AppBar from '@mui/material/AppBar';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType } from 'react';
import Text from '../text/text';
import HeaderMenu from './header-menu/header-menu';
import { SxProps } from '@mui/material';

/* eslint-disable-next-line */

export interface HeaderProps {
  component: ElementType;
  titleText: string;
  headerTextVariant: Variant;
  sxAppBar?: SxProps;
  sxText?: SxProps;
}

export function Header({
  component,
  titleText,
  headerTextVariant,
  sxAppBar,
  sxText,
}: HeaderProps) {
  return (
    <AppBar component={component} sx={sxAppBar}>
      <HeaderMenu />
      <Text
        titleVariant={headerTextVariant}
        titleText={titleText}
        sx={sxText}
      />
    </AppBar>
  );
}

export default Header;
