import darkScrollbar from '@mui/material/darkScrollbar';
import { createTheme } from '@mui/material/styles';
import './theme.module.css';

//yellows
const __primaryMain = '#ffd300';
const __primaryLight = '#ffdb33';
const __primaryDark = '#b29300';
const __primaryContrast = '#800080';

//pinks
const __secondaryMain = '#ff69b4';
const __secondaryLight = '#ff87c3';
const __secondaryDark = '#b2497d';
const __secondaryContrast = '#404040';

//Greys
const __greyDark = '#101010';
const __greyLight = '#707070';
const __greyDefault = '#404040';

//text main?
const __rustColor = '#ff3d00';

export const Theme = createTheme({
  palette: {
    common: {
      black: __greyDark,
      white: __greyLight
    },
    text: {
      primary: __primaryMain,
      secondary: __greyDark,
      disabled: __primaryDark
    },
    divider: __primaryContrast,
    action: {
      hover: __primaryContrast,
      hoverOpacity: 0.75
    },
    primary: {
      main: __primaryMain,
      light: __primaryLight,
      dark: __primaryDark,
      contrastText: __primaryContrast
    },
    secondary: {
      main: __secondaryMain,
      light: __secondaryLight,
      dark: __secondaryDark,
      contrastText: __secondaryContrast
    },
    info: {
      main: __greyDefault
    },
    success: {
      main: __rustColor
    },

    background: {
      default: __greyLight,
      paper: __greyDark
    }
  },

  typography: {
    fontFamily: 'Jersey25',
    h1: {
      fontFamily: 'Jersey25-Charted',
      fontSize: '8rem',
      color: __rustColor,
      textShadow: `2px 1px ${__primaryLight}`
    },
    h2: {
      fontSize: '4rem',
      fontFamily: 'Jersey25',
      color: __primaryMain,
      textShadow: `2px 1px ${__primaryContrast}`
    },
    h3: {
      fontFamily: 'Jersey25',
      fontSize: '2.5rem',
      color: __primaryMain,
      textShadow: `2px 1px ${__primaryContrast}`
    },
    h4: {
      fontFamily: 'Jersey25-Charted',
      fontSize: '2rem',
      color: __primaryMain,
      textShadow: `1px 1px ${__primaryContrast}`
    },
    h5: {
      fontFamily: 'Jersey25-Charted',
      fontSize: '5rem',
      color: __rustColor,
      textShadow: `2px 1px ${__primaryLight}`
    },
    body1: {
      fontFamily: 'Jersey25',
      color: __greyDark,
      fontSize: '2rem'
    },
    body2: {
      fontFamily: 'Jersey25',
      fontWeight: 100,
      fontSize: '1.5rem'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        main: darkScrollbar()
      }
    },
    MuiContainer: {
      variants: [
        {
          props: { component: 'div' },
          style: {
            gap: 4,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            margin: 0,
            padding: 0
          }
        },
        {
          props: { component: 'section' },
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: 0,
            padding: 0
          }
        }
      ]
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            type: 'submit',
            backgroundColor: __greyDefault,
            width: 230,
            height: 70,
            fontSize: 34
          }
        }
      ],
      defaultProps: {
        variant: 'outlined'
      }
    },
    MuiInputLabel: {
      variants: [
        {
          props: { component: 'h2' },
          style: {
            fontSize: '4rem',
            fontFamily: 'Jersey25-Charted',
            color: __primaryMain,
            textShadow: `2px 1px ${__primaryContrast}`
          }
        }
      ]
    },
    MuiImageListItemBar: {
      styleOverrides: {
        title: {
          fontSize: 36,
          color: __rustColor
        },
        root: {
          backgroundColor: __greyDark,
          borderRadius: 5
        }
      }
    }
  }
});

export default Theme;
