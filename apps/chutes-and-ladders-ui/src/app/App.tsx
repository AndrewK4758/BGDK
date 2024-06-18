import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShowGameBoard from '../components/game_board/show_game_board';
import Layout from '../components/layout/Layout';
import Waiting from '../components/layout/waiting';
import { NoGameError, NotEnoughPlayersError } from '../errors/error';
import ActiveGameSession from '../pages/active_game_session';
import GameDetails from '../pages/game_details';
import GamesList from '../pages/games_list';
import HomePage from '../pages/home-page';
import RegisterPlayerAndAvatarOnGame from '../pages/register_player_and_avatar_on_game';
import joinGameAction from '../services/action_functions/join_game_action';
import registerGameInstanceOnServerAction from '../services/action_functions/register_game_on_server_action';
import registerPlayerAndAvatarAction from '../services/action_functions/register_player_avatar_action';
import takeTurn from '../services/action_functions/take_turn';
import loadGameBoardAndAvatarInTurn from '../services/loader_functions/load_game_board_and_avatar_in_turn';
import loadGameList from '../services/loader_functions/load_game_list';
import loadPlayerAvatarRegisterFilterData from '../services/loader_functions/load_register_player_avatar_data_and_filter';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
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
                loader: loadGameBoardAndAvatarInTurn,
                id: 'gameBoard',
                errorElement: <NotEnoughPlayersError />,
                Component: ActiveGameSession,
                children: [
                  {
                    index: true,
                    Component: ShowGameBoard,
                    action: takeTurn,
                  },
                ],
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

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Waiting />} />;
}
