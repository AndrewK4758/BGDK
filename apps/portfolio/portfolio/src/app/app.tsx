import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import routes from '../routes/routes';
import { Waiting } from '@bgdk/shared-react-components';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Theme from '../styles/theme';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <RouterProvider router={router} fallbackElement={<Waiting />} />
    </ThemeProvider>
  );
};

export default App;
