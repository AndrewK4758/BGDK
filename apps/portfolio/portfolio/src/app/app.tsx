import { Waiting } from '@bgdk/shared-react-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from '../routes/routes';

const router = createBrowserRouter(routes);

const App = () => <RouterProvider router={router} fallbackElement={<Waiting />} />;

export default App;
