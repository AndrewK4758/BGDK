import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/layout';
import { Waiting } from '@bgdk/react-components';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Theme from '../styles/theme';
import '../styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
  },
]);

const App = () => (
  <ThemeProvider theme={Theme}>
    <RouterProvider router={router} fallbackElement={<Waiting />} />
  </ThemeProvider>
);

export default App;
