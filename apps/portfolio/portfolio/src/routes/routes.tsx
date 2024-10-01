import { RouteObject } from 'react-router-dom';
import Crud from '../pages/crud/crud';
import emailFormAction from '../services/actions/email-form-action';
import registerPlayersAndStartGame from '../services/loaders/register-players-and-start-game';
import ActiveGameSession from '../pages/games/active_game_session';
import App from '../app/app';
import { lazy } from 'react';

const Games = lazy(() => import('../pages/games/games'));

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
      },
    ],
  },
];

export default routes;
