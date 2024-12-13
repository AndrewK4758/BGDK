import type { SxProps } from '@mui/material/styles';

export const baseStyleForLayoutItems: SxProps = {
  flex: '1 0 100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw'
};

export const headerWrapperSxProps: SxProps = {
  position: 'fixed',
  top: '1vh',
  width: '55vw',
  display: 'flex',
  height: '8vh',
  maxHeight: '120px',
  justifyContent: 'center',
  alignContent: 'center',
  zIndex: 5
};

export const homeWrapperSxProps: SxProps = {
  ...baseStyleForLayoutItems,
  flex: '1 0 100%',
  justifyContent: 'space-between',
  gap: '25vh'
};

export const mainWrapperSxProps: SxProps = {
  ...baseStyleForLayoutItems,
  marginTop: '20vh',
  gap: '15vh'
};

export const outletWrapperSxProps: SxProps = {
  ...baseStyleForLayoutItems,
  height: 'fit-content',
  minHeight: '50vh',
  paddingBottom: '15vh'
};

export const footerWrapperSxProps: SxProps = {
  height: 'fit-content',
  width: '100%',
  textAlign: 'center'
};
