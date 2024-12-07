import type { SxProps } from '@mui/material/styles';
import { centerFlex } from './pages-styles';
import Theme from './theme';

export const iconWrapperSxProps: SxProps = {
  flex: '1 0 75%',
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-around',
};

export const iconSxProps: SxProps = {
  justifyContent: 'center',
  alignContent: 'center',
  scale: 1.4,
};

export const socialMediaLinksWrapper: SxProps = {
  ...centerFlex,
  flex: '1 0 100%',
  paddingX: 1,
  minHeight: 'fit-content',
};

//-------GOOGLE CALENDAR--------//

export const timePickerSxProps: SxProps = { fontSize: '1.25rem' };

//--------EMAIL ME---------//

export const dialogActionsStyles: SxProps = {
  flex: '0 1 45%',
  display: 'flex',
  alignItems: 'flex-end',
};

export const textFieldSlotProps = {
  inputLabel: { sx: { fontSize: '1.5rem', color: Theme.palette.primary.dark } as SxProps },
  htmlInput: {
    sx: {
      fontSize: '1.5rem',
      paddingTop: 2,
      backgroundColor: Theme.palette.background.default,
      color: Theme.palette.background.paper,
    } as SxProps,
  },
  input: {
    inputProps: {
      sx: {
        borderRadius: 1,
        color: Theme.palette.text.primary,
        backgroundColor: Theme.palette.background.default,
      },
    },
  },
};
