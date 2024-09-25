import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { enUS } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import './styles/styles.css';
import Theme from './styles/theme';
// import Background from './components/background/background';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline enableColorScheme />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={enUS.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        {/* <Background /> */}
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>,
);
