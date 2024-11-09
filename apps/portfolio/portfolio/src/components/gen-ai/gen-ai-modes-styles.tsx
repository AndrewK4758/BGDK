import type { SxProps } from '@mui/material/styles';
import Theme from '../../styles/theme';

export const helperTextSx: SxProps = {
  color: Theme.palette.error.main,
  fontSize: '1.25rem',
};

export const topLevelModeStyle: SxProps = {
  minHeight: '30vh',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 5,
  width: '70vw',
};

export const labelSx: SxProps = {
  color: Theme.palette.primary.main,
  width: 'fit-content',
  '&:hover': { cursor: 'pointer' },
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
};
