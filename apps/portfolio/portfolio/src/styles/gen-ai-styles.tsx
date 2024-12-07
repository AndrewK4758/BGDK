import { SxProps } from '@mui/material/styles';
import Theme from './theme';

//-------IMAGE FORM--------//

export const helperTextSx: SxProps = {
  color: Theme.palette.error.main,
  fontSize: '1.25rem',
};

export const labelSx: SxProps = {
  fontSize: '2rem',
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

export const sampleCountRadioTextStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  gap: 2,
  alignItems: 'center',
};

export const forrmControlLabelStyles: SxProps = { alignContent: 'center', fontSize: '1.5rem' };

export const radioGroupStyles: SxProps = {
  fontSize: '1.5rem',
  display: 'flex',
  flexDirection: 'row',
  gap: 4,
  paddingLeft: 2,
};
