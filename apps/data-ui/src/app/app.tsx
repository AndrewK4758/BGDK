import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Waiting } from '@bgdk/react-components';
import Artist from '../components/artists/artist-base';
import loadArtistsCount from '../services/loaders/load-artists-count';
import Layout from '../layout/layout';
import SelectedArtistDetails from '../components/albums/artist-albums';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    id: 'artistsWithCount',
    loader: loadArtistsCount,
    children: [
      {
        path: 'artists',
        Component: Artist,
      },
      {
        path: 'albums',
        Component: SelectedArtistDetails,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} fallbackElement={<Waiting />} />;
}

export default App;
