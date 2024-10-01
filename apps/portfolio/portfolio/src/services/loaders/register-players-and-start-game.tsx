import { redirect, type ActionFunction, type ActionFunctionArgs } from 'react-router-dom';
import registerGame from '../register-games/register-game';
import registerPlayers from '../register-games/registers-players';
import startGame from '../register-games/start-game';

const registerPlayersAndStartGame: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const gameName = await request.text();
  try {
    const registered = await registerGame(gameName);

    if (registered) {
      const __current_game__ = sessionStorage.getItem('__current_game__') as string;
      const playersIds = await registerPlayers(gameName, __current_game__);

      if (playersIds) {
        const resp = await startGame(gameName, __current_game__);

        if (resp.message === 'Game Started') {
          sessionStorage.setItem('playersIds', JSON.stringify(resp.playersInOrder));
          return redirect(gameName);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default registerPlayersAndStartGame;
