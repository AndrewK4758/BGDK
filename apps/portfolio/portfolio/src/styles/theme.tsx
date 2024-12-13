import createTheme, { type Theme as ThemeType } from '@mui/material/styles/createTheme';
import { enUS } from '@mui/x-date-pickers/locales';

const darkScrollbarGlobal = {
  '&::-webkit-scrollbar': {
    width: '16px'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#1f1f1f'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#3a3c41',
    borderRadius: '4px'
  }
};

const Theme: ThemeType = createTheme(
  {
    defaultColorScheme: 'dark',
    palette: {
      common: {
        black: '#ffffff',
        white: '#fffdf6'
      },
      primary: {
        main: '#00dfb9',
        light: '#33e5c7',
        dark: '#009c81',
        contrastText: '#3a3c41'
      },
      secondary: {
        main: '#cb91ff',
        light: '#e4c4ff',
        dark: '#58278b',
        contrastText: '#f9f871'
      },
      background: {
        paper: '#1f1f1f',
        default: '#3a3c41'
      },
      text: {
        primary: '#cbcbcb',
        secondary: '#3a3c41'
      }
    },
    shape: {
      borderRadius: 10
    },
    typography: {
      fontFamily: 'League Gothic',

      allVariants: {
        fontWeight: 'bold',
        letterSpacing: 3,
        wordSpacing: 3.5
      },

      body1: {
        fontSize: '1rem',
        fontFamily: 'Roboto',
        letterSpacing: 2.0,
        wordSpacing: 1.5
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: { body: darkScrollbarGlobal }
      },
      MuiButton: {
        defaultProps: { sx: { fontSize: '2rem' } }
      },
      MuiInputBase: { defaultProps: { sx: { color: '#cbcbcb' } } }
    }
  },
  enUS
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
