import type { SxProps } from '@mui/material/styles';
import Theme from '../../styles/theme';
import type { CSSProperties } from 'react';

export const topLevelModeStyle: SxProps = {
  minHeight: '100%',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 1,
  width: '60vw',
};

export const labelSx: SxProps = {
  color: Theme.palette.primary.main,
  flex: '0 1 auto',
  fontSize: '3rem',
  fontFamily: 'League Gothic',
};

export const tooltipSx: SxProps = {
  maxWidth: '80vw',
  fontSize: '1rem',
  color: Theme.palette.text.primary,
  backgroundColor: Theme.palette.background.default,
  border: `2px solid ${Theme.palette.primary.main}`,
};

export const textInputSx: SxProps = {
  color: Theme.palette.primary.main,
  backgroundColor: Theme.palette.background.default,
  borderRadius: 1,
  width: '100%',
};

export const renderPreTagInsideParentDiv: SxProps | CSSProperties = {
  width: '100%',
  height: 'fit-content',
  minHeight: '10vh',
  overflow: 'hidden',
  whiteSpace: 'pre-wrap',
};

export const helperTextSx: SxProps = {
  color: Theme.palette.error.main,
  fontSize: '1.25rem',
};
