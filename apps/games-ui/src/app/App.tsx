import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ActiveUserProvider from '../context/active-user-context-provider';
import { NoGameError, NotEnoughPlayersError } from '../errors/error';
import ActiveGameSession from '../pages/active_game_session';
import GameDetails from '../pages/game_details';
import GamesList from '../pages/games_list';
import Home from '../pages/home-page';
import RegisterPlayerAndAvatarOnGame from '../pages/register_player_and_avatar_on_game';
import registerGameInstanceOnServerAction from '../services/action_functions/register_game_on_server_action';
import registerPlayerAndAvatarAction from '../services/action_functions/register_player_avatar_action';
import vertexSubmitAction from '../services/action_functions/vertex-submit-action';
import loadGameList from '../services/loader_functions/load_game_list';
import loadPlayerAvatarRegisterFilterData from '../services/loader_functions/load_register_player_avatar_data_and_filter';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
        action: vertexSubmitAction,
      },
      {
        path: 'games',
        id: 'gameList',
        loader: loadGameList,
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
                Component: RegisterPlayerAndAvatarOnGame,
                id: 'registerData',
                errorElement: <NoGameError />,
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
    ],
  },
]);

const App = () => (
  <ActiveUserProvider>
    <RouterProvider router={router} />
  </ActiveUserProvider>
);

export default App;
