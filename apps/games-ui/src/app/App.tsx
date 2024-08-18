import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Waiting from '../components/layout/waiting';
import { NoGameError, NotEnoughPlayersError } from '../errors/error';
import ActiveGameSession from '../pages/active_game_session';
import GameDetails from '../pages/game_details';
import GamesList from '../pages/games_list';
import HomePage from '../pages/home-page';
import RegisterPlayerAndAvatarOnGame from '../pages/register_player_and_avatar_on_game';
import joinGameAction from '../services/action_functions/join_game_action';
import registerUserAction from '../services/action_functions/register-user-action';
import registerGameInstanceOnServerAction from '../services/action_functions/register_game_on_server_action';
import registerPlayerAndAvatarAction from '../services/action_functions/register_player_avatar_action';
import vertexSubmitAction from '../services/action_functions/vertex-submit-action';
import loadGameList from '../services/loader_functions/load_game_list';
import loadPlayerAvatarRegisterFilterData from '../services/loader_functions/load_register_player_avatar_data_and_filter';
import loginUserAction from '../services/action_functions/login-action';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    action: loginUserAction,
    id: 'activeUserData',
    children: [
      {
        index: true,
        path: 'register-user',
        action: registerUserAction,
      },
      {
        index: true,
        Component: HomePage,
        action: vertexSubmitAction,
      },
      {
        path: 'games',
        loader: loadGameList,
        id: 'gameList',
        children: [
          {
            index: true,
            Component: GamesList,
          },
          {
            path: ':id',
            action: registerGameInstanceOnServerAction,
            errorElement: <NoGameError />,
            children: [
              {
                index: true,
                Component: GameDetails,
              },
              {
                path: 'register',
                loader: loadPlayerAvatarRegisterFilterData,
                id: 'registerData',
                errorElement: <NoGameError />,
                children: [
                  {
                    index: true,
                    Component: RegisterPlayerAndAvatarOnGame,
                  },
                ],
              },
              {
                path: 'play',
                action: registerPlayerAndAvatarAction,
                Component: ActiveGameSession,
                id: 'gameBoard',
                errorElement: <NotEnoughPlayersError />,
              },
            ],
          },
        ],
      },
      {
        index: true,
        path: 'join-game',
        action: joinGameAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} fallbackElement={<Waiting />} />;
};
export default App;
