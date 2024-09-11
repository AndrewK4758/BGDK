import createTheme from '@mui/material/styles/createTheme';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#ffd300',
      light: '#ffdb33',
      dark: '#b29300',
      contrastText: '#00a584',
    },
    background: {
      default: '#4d4637',
    },
  },
});

export default Theme;
