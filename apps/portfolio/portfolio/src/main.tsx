// import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Waiting } from '@bgdk/shared-react-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes/routes';

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <StrictMode>
  <RouterProvider router={router} fallbackElement={<Waiting />} />,
  // </StrictMode>,
);
