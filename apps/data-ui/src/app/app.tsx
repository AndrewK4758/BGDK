// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Waiting } from '@bgdk/react-components';
import Layout from '../layout/layout';
import submitArtistAction from '../services/actions/submit-artist-action';
import loadArtists from '../services/loaders/load-artists';
// import Artist from '../components/artists/artist-base';
import Album from '../components/albums/album-base';
import Artist2 from '../components/artists/artist2';
import Artist from '../components/artists/artist-base';
const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    // id: 'artists',
    // loader: loadArtists,
    children: [
      {
        index: true,
        Component: Artist,
        path: 'artist',

        action: submitArtistAction,
      },
      {
        index: true,
        path: 'album',
        // Component: Album,
      },
    ],
  },
  {
    // index: true,
    path: '/artist',
    // action: submitArtistAction,
  },
]);

export function App() {
  return <RouterProvider router={router} fallbackElement={<Waiting />} />;
}

export default App;
