import { redirect, type ActionFunction, type ActionFunctionArgs } from 'react-router-dom';
import registerGame from '../register-games/register-game';
import registerPlayers from '../register-games/registers-players';
import startGame from '../register-games/start-game';
import type { GamePlayerValidation } from '@bgdk/types-game';
import gamesAutoStartError from '../../errors/games-auto-start-error';

const registerPlayersAndStartGame: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const gameName = await request.text();

  let __current_game__: GamePlayerValidation;
  try {
    const gameInstanceID = (await registerGame(gameName)) as string;

    sessionStorage.setItem('__current_game__', gameInstanceID);
    __current_game__ = JSON.parse(gameInstanceID);

    if (gameInstanceID) {
      const allRegistered = await registerPlayers(gameName, __current_game__);

      if (allRegistered) {
        const resp = await startGame(gameName, __current_game__);

        if (resp.message === 'Game Started') {
          sessionStorage.setItem('playersIds', JSON.stringify(resp.playersInOrder));

          return redirect(gameName);
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return gamesAutoStartError(`starting ${gameName}`);
  }
};

export default registerPlayersAndStartGame;
