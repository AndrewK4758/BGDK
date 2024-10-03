import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import App from '../app/app';
import emailFormAction from '../services/actions/email-form-action';
import loadArtistAlbums from '../services/loaders/crud-loaders/load-artist-albums';
import loadArtistsCount from '../services/loaders/crud-loaders/load-artists-count';
import registerPlayersAndStartGame from '../services/loaders/register-players-and-start-game';
import loadAlbumTracks from '../services/loaders/crud-loaders/load-album-tracks';
import loadAlbumsCount from '../services/loaders/crud-loaders/load-albums-count';

const Games = lazy(() => import('../pages/games/games'));
const ActiveGameSession = lazy(() => import('../components/games/active_game_session'));

const Crud = lazy(() => import('../pages/crud/crud'));
const AddEntry = lazy(() => import('../components/crud/add-entry/add-entry'));
const Album = lazy(() => import('../components/crud/albums/album-base'));
const Artist = lazy(() => import('../components/crud/artists/artist-base'));
const AlbumsOnArtist = lazy(() => import('../components/crud/albums/artist-albums'));
const Tracks = lazy(() => import('../components/crud/tracks/album-tracks'));

const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    action: emailFormAction,
    children: [
      {
        path: 'games',
        action: registerPlayersAndStartGame,
        Component: Games,
        children: [
          {
            index: true,
            path: ':id',
            Component: ActiveGameSession,
          },
        ],
      },
      {
        path: 'crud',
        Component: Crud,
        children: [
          {
            index: true,
            path: 'add-entry',
            Component: AddEntry,
          },
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
    ],
  },
];

export default routes;
