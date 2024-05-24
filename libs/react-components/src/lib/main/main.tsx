// import styles from './main.module.css';
import Container from '@mui/material/Container';
import { ElementType } from 'react';
import { Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface MainProps {
  component: ElementType;
  maxWidth: 'mobile' | 'tablet' | 'laptop' | 'desktop' | false;
}

export function Main({ component, maxWidth }: MainProps) {
  return (
    <Container component={component} maxWidth={maxWidth} sx={{ textAlign: 'center' }}>
      <Outlet />
    </Container>
  );
}

export default Main;
