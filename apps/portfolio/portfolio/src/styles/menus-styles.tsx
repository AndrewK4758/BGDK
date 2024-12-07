import type { SxProps } from '@mui/material/styles';
import Theme from './theme';

export const cubeSxProps: SxProps = {
  position: 'fixed',
  zIndex: 2,
  width: 'fit-content',
  maxWidth: '350px',
  minWidth: '12%',
  height: '8%',
  maxHeight: '200px',
};

export const buttonSXProps: SxProps = {
  fontSize: '3rem',
  width: '100%',
  color: Theme.palette.background.default,
};

export const closeMenusStyles: SxProps = {
  justifySelf: 'center',
  cursor: 'pointer',
  fontSize: '.8rem',
  textAlign: 'center',
  maxHeight: '1.5rem',
  backgroundColor: Theme.palette.background.default,
  width: '75px',
  borderRadius: 0.4,
  alignSelf: 'flex-end',
};

export const menuIconsStyles: SxProps = { fontSize: '3rem' };
