import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddEntry from '../components/add-entry/add-entry.tsx';
import Album from '../components/albums/album-base.tsx';
import AlbumsOnArtist from '../components/albums/artist-albums.tsx';
import Artist from '../components/artists/artist-base.tsx';
import Tracks from '../components/tracks/album-tracks.tsx';
import Layout from '../pages/layout/layout.tsx';
import loadAlbumTracks from '../services/loaders/load-album-tracks.tsx';
import loadAlbumsCount from '../services/loaders/load-albums-count.tsx';
import loadArtistAlbums from '../services/loaders/load-artist-albums.tsx';
import loadArtistsCount from '../services/loaders/load-artists-count.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Layout,
      children: [
        {
          path: 'artists',
          id: 'artist-count',
          Component: Artist,
          loader: loadArtistsCount,
          children: [
            {
              path: ':artistID/album',
              id: 'artist-albums',
              Component: AlbumsOnArtist,
              loader: loadArtistAlbums,
              children: [
                {
                  path: ':albumID/tracks',
                  loader: loadAlbumTracks,
                  Component: Tracks,
                },
              ],
            },
          ],
        },
        {
          path: 'albums',
          id: 'albums-count',
          Component: Album,
          loader: loadAlbumsCount,
          children: [
            {
              path: ':albumID/tracks',
              Component: Tracks,
              loader: loadAlbumTracks,
            },
          ],
        },
      ],
    },

    {
      index: true,
      path: 'add-entry',
      Component: AddEntry,
    },
  ],
  { basename: '/' },
);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
