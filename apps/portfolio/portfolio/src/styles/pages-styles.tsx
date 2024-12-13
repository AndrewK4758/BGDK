import type { SxProps } from '@mui/material/styles';
import Theme from './theme';

export const pagesWrapperStyles: SxProps = {
  flex: '1 0 100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10vh',
  alignItems: 'center',
  height: 'fit-content',
  minHeight: '80vh',
  width: '80vw'
};

export const centerFlex: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const pagesTitlesBoxStyles: SxProps = {
  ...centerFlex,
  paddingY: 2
};

export const pagesToolbarStyles: SxProps = { display: 'flex', justifyContent: 'space-evenly', flex: '1 0 100%' };

export const pagesButtonStyles: SxProps = { fontSize: '2rem', color: Theme.palette.text.secondary };

export const modalButtonBoxStyles: SxProps = {
  display: 'flex',
  flex: '0 1 100%',
  justifyContent: 'flex-end',
  alignItems: 'center'
};

export const pagesOutletStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100%',
  height: 'fit-content'
};

export const fullPageModalStyles: SxProps = {
  height: '100vh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowY: 'auto'
};

export const fullSizeBlock: SxProps = { height: '100%', width: '100%' };

export const headerModalButtonStyles: SxProps = {
  textAlign: 'right',
  color: Theme.palette.secondary.light,
  fontSize: '1.25rem'
};

export const pagesTitleSx: SxProps = {
  width: 'fit-content',
  maxWidth: '80%',
  textAlign: 'center',
  flex: '1 0 100%'
};
