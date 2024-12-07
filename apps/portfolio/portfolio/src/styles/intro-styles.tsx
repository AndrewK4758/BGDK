import type { SxProps } from '@mui/material/styles';
import Theme from './theme';
import { flexColumnStyles } from './prompt-builder-styles';

export const baseStyleForHomeItems: SxProps = {
  width: '80vw',
  display: 'flex',
};

export const introCardSxProps: SxProps = {
  position: 'relative',
  zIndex: 1,
  flex: '0 1 50%',
  height: 'fit-content',
  display: 'flex',
};
export const introCardContentSxProps: SxProps = { paddingX: 2, display: 'flex', flexDirection: 'column' };

export const introTextSxProps: SxProps = { textAlign: 'start', paddingY: 2, fontSize: '1.25rem' };
export const introTitleTextSxProps: SxProps = {
  borderBottom: `3px solid ${Theme.palette.primary.dark}`,
  width: 'fit-content',
  alignSelf: 'center',
};

export const picAndResumeCardStyles: SxProps = {
  ...flexColumnStyles,
  paddingTop: 3,
  flex: '0 1 35%',
  position: 'relative',
  alignSelf: 'center',
  height: 'fit-content',
  alignItems: 'center',
  justifyItems: 'space-evenly',
};

export const introPicStyles: SxProps = {
  flex: '0 1 80%',
  width: '80%',
  borderRadius: 1,
  border: `5px solid ${Theme.palette.primary.dark}`,
};

export const techListSectionContainer: SxProps = {
  flex: '1 0 25%',
  paddingY: 2,
  borderTop: `2px solid ${Theme.palette.primary.dark}`,
};

export const techlistTextStyle: SxProps = {
  borderBottom: `2px solid ${Theme.palette.primary.dark}`,
  width: 'fit-content',
};
