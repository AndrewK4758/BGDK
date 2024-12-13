import type { SxProps } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import Theme from '../theme/theme';

//-------C&L-------//

export const breakpointsRowSx: SxProps = {
  flex: '1 0 10%',
  height: '7vh',
  border: `3px solid ${Theme.palette.success.main}`,
  alignContent: 'center',
  justifyContent: 'center',
  [Theme.breakpoints.down('md')]: {
    border: `1.5px solid ${Theme.palette.success.main}`
  }
};

export const breakpointsSpaceSx: SxProps = {
  fontSize: '1.5rem',
  [Theme.breakpoints.down('md')]: {
    fontSize: '.75rem'
  }
};

export const spaceStyle: SxProps = { display: 'flex', flex: '1 0 100%' };

export const avatarSize: CSSProperties = {
  alignSelf: 'self-start',
  width: 'auto',
  height: '108%'
};

//--------TTT--------//

export const breakpointsRowTTTSx: SxProps = {
  display: 'flex',
  flex: 1,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  border: `3px solid ${Theme.palette.success.main}`,
  [Theme.breakpoints.down('md')]: {
    border: `1.5px solid ${Theme.palette.success.main}`
  }
};

export const breakpointsSpaceTTTSx: SxProps = {
  display: 'none'
};

export const avatarTTTSize: CSSProperties = {
  width: 'auto',
  height: '150px'
};

export const rowSizeTTT: SxProps = { height: '33.4 ', flex: '1 0 100%' };

export const nonSelectedSpaceStyle: SxProps = { backgroundColor: Theme.palette.background.default };

export const selectedSpaceStyle: SxProps = { backgroundColor: '#FFD300', color: '#58278b' };

export const svgSpaceTTTStyles: SxProps = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
  border: 5
};
