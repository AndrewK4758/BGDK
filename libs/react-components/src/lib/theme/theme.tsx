import createTheme from '@mui/material/styles/createTheme';
import './theme.module.css';

declare module '@mui/material' {
  interface BreakpointOverrides {
    // Your custom breakpoints
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    // Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}

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
let Theme = createTheme();
Theme = createTheme(Theme, {
  palette: {
    common: {
      black: __greyDark,
      white: __greyLight,
    },
    text: {
      primary: __primaryMain,
      secondary: __greyDark,
      disabled: __primaryDark,
    },
    divider: __primaryContrast,
    action: {
      hover: __primaryContrast,
      hoverOpacity: 0.75,
    },
    primary: {
      main: __primaryMain,
      light: __primaryLight,
      dark: __primaryDark,
      contrastText: __primaryContrast,
    },
    secondary: {
      main: __secondaryMain,
      light: __secondaryLight,
      dark: __secondaryDark,
      contrastText: __secondaryContrast,
    },
    info: {
      main: __greyDefault,
    },
    success: {
      main: __rustColor,
    },

    background: {
      default: __greyLight,
      paper: __greyDark,
    },
  },
  breakpoints: {
    values: {
      laptop: 1024,
      tablet: 640,
      mobile: 0,
      desktop: 1280,
    },
    unit: 'px',
  },

  typography: {
    fontFamily: 'Jersey25',
    h1: {
      fontFamily: 'Jersey25-Charted',
      fontSize: '8rem',
      color: __rustColor,
      textShadow: `2px 1px ${__primaryLight}`,
      [Theme.breakpoints.up('laptop')]: {
        fontSize: '3rem',
      },
    },
    h2: {
      fontSize: '4rem',
      color: __primaryMain,
      textShadow: `2px 1px ${__primaryContrast}`,
    },
    h3: {
      fontFamily: 'Jersey25',
      fontSize: '2.5rem',
      textShadow: `2px 1px ${__primaryContrast}`,
    },
    h4: {
      fontFamily: 'Jersey25-Charted',
      fontSize: '2rem',
      color: __primaryMain,
      textShadow: `1px 1px ${__primaryContrast}`,
    },
    h5: {
      fontFamily: 'Jersey25-Charted',
      fontSize: '5rem',
      color: __rustColor,
      textShadow: `2px 1px ${__primaryLight}`,
    },
    body1: {
      color: __greyDark,
      fontSize: '2rem',
    },
    body2: {
      fontWeight: 100,
      fontSize: '1.5rem',
    },
  },
  components: {
    MuiContainer: {
      variants: [
        {
          props: { component: 'main' },
          style: {
            position: 'absolute',
            top: 65,
            bottom: 65,
            left: 0,
            right: 0,
            backgroundColor: __greyLight,
            zIndex: 9,
            paddingTop: '1.5rem',
          },
        },
        {
          props: { component: 'div' },
          style: {
            gap: 4,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          },
        },
        {
          props: { component: 'section' },
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: 0,
          },
        },
      ],
      defaultProps: {
        disableGutters: false,
        maxWidth: false,
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { component: 'footer' },
          style: {
            position: 'absolute',
            top: 'calc(100% - 65px)',
            bottom: 0,
            right: 0,
            left: 0,
            textAlign: 'center',
            alignContent: 'center',
            zIndex: 10,
          },
        },
      ],
      defaultProps: {
        color: 'transparent',
      },
    },
    MuiAppBar: {
      variants: [
        {
          props: { component: 'header' },
          style: {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            zIndex: 10,
            backgroundColor: __greyDark,
            boxShadow: `0px 7px 8px -4px ${__rustColor}, 0px 12px 17px 2px ${__primaryLight}, 0px 5px 22px 4px ${__primaryDark}`,
          },
        },
      ],
      defaultProps: {
        color: 'transparent',
      },
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
            marginTop: '1%',
            fontSize: 34,
          },
        },
      ],
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiInputLabel: {
      variants: [
        {
          props: { component: 'h2' },
          style: {
            fontSize: '4rem',
            fontFamily: 'Jersey25-Charted',
            color: __primaryMain,
            textShadow: `2px 1px ${__primaryContrast}`,
          },
        },
      ],
    },
    MuiImageListItemBar: {
      styleOverrides: {
        title: {
          fontSize: 36,
          color: __rustColor,
        },
        root: {
          backgroundColor: __greyDark,
          borderRadius: 5,
        },
      },
    },
  },
});

export { Theme };