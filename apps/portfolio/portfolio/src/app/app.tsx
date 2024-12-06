import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { enUS } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '../components/layout/layout';
import '../styles/styles.css';
import Theme from '../styles/theme.tsx';

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={enUS.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <ThemeProvider theme={Theme}>
        <CssBaseline enableColorScheme />
        <Layout />
      </ThemeProvider>
    </LocalizationProvider>
  </GoogleOAuthProvider>
);

export default App;
