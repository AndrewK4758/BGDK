import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Waiting } from '@bgdk/shared-react-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routes from './routes/routes';

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<Waiting />} />
  </StrictMode>,
);
