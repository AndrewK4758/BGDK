import linearProgressClasses from '@mui/material/LinearProgress/linearProgressClasses';
import type { SxProps } from '@mui/material/styles';
import Theme from './theme';
import { flexColumnStyles } from './prompt-builder-styles';
import { centerFlex } from './pages-styles';

export const loadingPaperStyles: SxProps = {
  ...flexColumnStyles,
  width: '100%',
  height: '20vh',
  maxHeight: 'fit-content',
  justifyContent: 'center',
  borderRadius: 1,
};

export const loadingBarWrapperStyles: SxProps = {
  ...centerFlex,
  flex: '1 0 75%',
  width: '100%',
};

export const loadingBarStyles: SxProps = {
  border: 5,
  height: '50%',
  flex: '1 0 80%',
  borderRadius: 0.6,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    background: `linear-gradient(to right, ${Theme.palette.secondary.light},${Theme.palette.primary.light})`,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0.6,
    background: `linear-gradient(to right, ${Theme.palette.primary.light},${Theme.palette.secondary.light})`,
  },
};

export const loadingBarTextStyles: SxProps = {
  ...centerFlex,
  flex: '1 0 75%',
  width: '100%',
};
