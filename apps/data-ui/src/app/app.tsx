// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Waiting } from '@bgdk/react-components';
import Artist from '../components/artists/artist-base';
import loadArtistsCount from '../services/loaders/load-artists';
import Layout from '../layout/layout';
import SelectedArtistDetails from '../components/artists/selected-artist-details';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    id: 'artistsWithCount',
    loader: loadArtistsCount,
    children: [
      {
        path: 'artist',
        Component: Artist,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} fallbackElement={<Waiting />} />;
}

export default App;
