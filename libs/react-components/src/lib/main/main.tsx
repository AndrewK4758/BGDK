import { SxProps } from '@mui/material';
import Container from '@mui/material/Container';
import { ElementType } from 'react';
import { Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface MainProps {
  component: ElementType;
  maxWidth: 'mobile' | 'tablet' | 'laptop' | 'desktop' | false;
  breakpointsMain?: SxProps;
  id: string;
}

export function Main({ component, maxWidth, breakpointsMain, id }: MainProps) {
  return (
    <Container component={component} id={id} maxWidth={maxWidth} sx={breakpointsMain}>
      <Outlet />
    </Container>
  );
}

export default Main;
