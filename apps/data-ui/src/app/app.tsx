// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Waiting } from '@bgdk/react-components';
import Artist from '../components/artists/artist-base';
// import axios from 'axios';
import loadArtists from '../services/loaders/load-artists';

// const baseURL = import.meta.env.VITE_DATA_API_URL;

const router = createBrowserRouter([
  {
    path: '/',
    // Component: Layout,
    Component: Artist,
    id: 'artistsWithCount',
    loader: loadArtists,
    children: [
      {
        index: true,
        path: 'details',
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
