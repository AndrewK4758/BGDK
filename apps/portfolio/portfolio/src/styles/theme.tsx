import { darkScrollbar } from '@mui/material';
import createTheme, { type Theme } from '@mui/material/styles/createTheme';
import { enUS } from '@mui/x-date-pickers/locales';
import './styles.css';

const Theme: Theme = createTheme(
  {
    defaultColorScheme: 'dark',
    palette: {
      common: {
        black: '#ffffff',
        white: '#fffdf6',
      },
      primary: {
        main: '#00dfb9',
        light: '#33e5c7',
        dark: '#009c81',
        contrastText: '#4d4637',
      },
      secondary: {
        main: '#cb91ff',
        light: '#e4c4ff',
        dark: '#58278b',
        contrastText: '#f9f871',
      },
      background: {
        paper: '#1f1f1f',
        default: '#3a3c41',
      },
      text: {
        primary: '#cbcbcb', //'#f3ead9',
        secondary: '#3a3c41',
      },
    },
    shape: {
      borderRadius: 20,
    },
    typography: {
      fontFamily: 'League Gothic',

      body1: {
        fontSize: '1rem',
        fontFamily: 'Roboto',
        letterSpacing: 1.5,
        wordSpacing: 1,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: themeParam => ({ body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null }),
      },
    },
  },
  enUS,
);

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
