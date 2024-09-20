import createTheme, { type Theme } from '@mui/material/styles/createTheme';
import './styles.css';

const Theme: Theme = createTheme({
  defaultColorScheme: 'dark',
  palette: {
    common: {
      black: '#363027',
      white: '#fffdf6',
    },
    primary: {
      main: '#00dfb9',
      light: '#33e5c7',
      dark: '#009c81',
      contrastText: '#4d4637', //'#171738',
    },
    secondary: {
      main: '#ffd300',
      light: '#ffdb33',
      dark: '#b29300',
      contrastText: '#4d4637',
    },
    background: {
      paper: '#1d1607',
      default: '#4d4637',
    },
    text: {
      primary: '#f3ead9',
      secondary: '#b3aa99',
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: 'League Gothic',
  },
});

export default Theme;

/* You can add global styles to this file, and also import other style files */
/*
grey friends
#FFD300 yellow - #4d4637 dark - #b3aa99 light

Classy Palette
#ffd300 - yellow
#4d4637 - dark
#b3aa99 - grey
#00dfb9 - teal
#00a584 - green

*/
