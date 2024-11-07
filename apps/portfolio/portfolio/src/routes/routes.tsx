import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import App from '../app/app';
import emailFormAction from '../services/actions/email-form-action';
import loadArtistAlbums from '../services/loaders/crud-loaders/load-artist-albums';
import loadArtistsCount from '../services/loaders/crud-loaders/load-artists-count';
import registerPlayersAndStartGame from '../services/loaders/register-players-and-start-game';
import loadAlbumTracks from '../services/loaders/crud-loaders/load-album-tracks';
import loadAlbumsCount from '../services/loaders/crud-loaders/load-albums-count';
import handlePromptBuilder from '../services/actions/prompt-builder-action';
import generateImageAction from '../services/actions/generate-image-action';
// import loadPtyShell from '../services/loaders/gen-ai/load-pty-shell';

const Games = lazy(() => import('../pages/games/games'));
const ActiveGameSession = lazy(() => import('../components/games/active_game_session'));

const Crud = lazy(() => import('../pages/crud/crud'));
const AddEntry = lazy(() => import('../components/crud/add-entry/add-entry'));
const Album = lazy(() => import('../components/crud/albums/album-base'));
const Artist = lazy(() => import('../components/crud/artists/artist-base'));
const AlbumsOnArtist = lazy(() => import('../components/crud/albums/artist-albums'));
const Tracks = lazy(() => import('../components/crud/tracks/album-tracks'));
const GenAI = lazy(() => import('../pages/ai/gen-ai'));

const TextGenerator = lazy(() => import('../components/gen-ai/text/text'));
const Image = lazy(() => import('../components/gen-ai/image/image'));
const LocalModel = lazy(() => import('../components/gen-ai/local/local-model'));

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
            Component: Artist,
            loader: loadArtistsCount,
            children: [
              {
                path: ':artistID/albums',
                loader: loadArtistAlbums,
                Component: AlbumsOnArtist,
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
        path: 'gen-ai',
        Component: GenAI,
        children: [
          {
            path: 'text',
            Component: TextGenerator,
            action: handlePromptBuilder,
          },
          {
            path: 'image',
            Component: Image,
            action: generateImageAction,
          },
          {
            path: 'local',
            // id: 'localModel',
            Component: LocalModel,
            // loader: loadPtyShell,
          },
        ],
      },
    ],
  },
];

export default routes;
