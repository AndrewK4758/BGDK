import AppBar from '@mui/material/AppBar';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType } from 'react';
import Text from '../text/text';
import HeaderMenu from './header-menu/header-menu';

/* eslint-disable-next-line */

export interface HeaderProps {
  component: ElementType;
  titleText: string;
  headerTextVariant: Variant;
}

export function Header({ component, titleText, headerTextVariant }: HeaderProps) {
  return (
    <AppBar component={component} sx={{ paddingX: '1rem' }}>
      <HeaderMenu />
      <Text
        titleVariant={headerTextVariant}
        titleText={titleText}
        sx={{ flex: '1 0 auto', textAlign: 'end', alignSelf: 'center' }}
      />
    </AppBar>
  );
}

export default Header;
