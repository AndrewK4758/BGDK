import type { SxProps } from '@mui/material/styles';
import Theme from './theme';

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
