import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import App from '../app/app';
import emailFormAction from '../services/actions/email-form-action';
import generateImageAction from '../services/actions/generate-image-action';
import handlePromptBuilder from '../services/actions/prompt-builder-action';
import vertexSubmitAction from '../services/actions/vertex-submit-action';
import loadAlbumTracks from '../services/loaders/crud-loaders/load-album-tracks';
import loadAlbumsCount from '../services/loaders/crud-loaders/load-albums-count';
import loadArtistAlbums from '../services/loaders/crud-loaders/load-artist-albums';
import loadArtistsCount from '../services/loaders/crud-loaders/load-artists-count';
import loadContextPath from '../services/loaders/gen-ai/load-context-path';
import registerPlayersAndStartGame from '../services/loaders/register-players-and-start-game';
import { Waiting } from '@bgdk/shared-react-components';
import GameLoading from '../components/loading/loading';

const Games = lazy(() => import('../pages/games/games'));
const ActiveGameSession = lazy(() => import('../components/games/active_game_session'));

const Crud = lazy(() => import('../pages/crud/crud'));
const AddEntry = lazy(() => import('../components/crud/add-entry/add-entry'));
const Album = lazy(() => import('../components/crud/albums/album-base'));
const Artist = lazy(() => import('../components/crud/artists/artist-base'));
const AlbumsOnArtist = lazy(() => import('../components/crud/albums/artist-albums'));
const Tracks = lazy(() => import('../components/crud/tracks/album-tracks'));
const GenAI = lazy(() => import('../pages/gen-ai/gen-ai'));

const TextGenerator = lazy(() => import('../components/gen-ai/text/text'));
const Image = lazy(() => import('../components/gen-ai/image/image'));
const Audio = lazy(() => import('../components/gen-ai/audio/audio'));

const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    action: emailFormAction,
    hydrateFallbackElement: <Waiting />,
    children: [
      {
        path: 'games',
        action: registerPlayersAndStartGame,
        Component: Games,
        children: [
          {
            index: true,
            path: ':id',
            hydrateFallbackElement: <GameLoading />,
            Component: ActiveGameSession,
          },
        ],
      },
      {
        path: 'crud',
        Component: Crud,
        hydrateFallbackElement: <Waiting />,
        children: [
          {
            index: true,
            path: 'add-entry',
            Component: AddEntry,
            hydrateFallbackElement: <Waiting />,
          },
          {
            path: 'artists',
            Component: Artist,
            loader: loadArtistsCount,
            hydrateFallbackElement: <Waiting />,
            children: [
              {
                path: ':artistID/albums',
                loader: loadArtistAlbums,
                Component: AlbumsOnArtist,
                hydrateFallbackElement: <Waiting />,
                children: [
                  {
                    path: ':albumID/tracks',
                    loader: loadAlbumTracks,
                    hydrateFallbackElement: <Waiting />,
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
            hydrateFallbackElement: <Waiting />,
            children: [
              {
                path: ':albumID/tracks',
                Component: Tracks,
                loader: loadAlbumTracks,
                hydrateFallbackElement: <Waiting />,
              },
            ],
          },
        ],
      },
      {
        path: 'gen-ai',
        Component: GenAI,
        loader: loadContextPath,
        hydrateFallbackElement: <Waiting />,
        action: handlePromptBuilder,
        children: [
          {
            path: 'text',
            Component: TextGenerator,
            action: vertexSubmitAction,
            hydrateFallbackElement: <Waiting />,
          },
          {
            path: 'image',
            Component: Image,
            action: generateImageAction,
            hydrateFallbackElement: <Waiting />,
          },
          {
            path: 'audio',
            Component: Audio,
            hydrateFallbackElement: <Waiting />,
          },
        ],
      },
    ],
  },
];

export default routes;
