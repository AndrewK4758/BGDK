import { GamePlayerValidation } from '@aklapper/model';
import { ActionFunctionArgs, redirect } from 'react-router-dom';

export const joinGameAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  const gamePath = data.gamePath;

  const parts = gamePath.split('/');

  const gameID = parts[parts.length - 1];
  const id = parts[parts.length - 2];
  const __current_game__: GamePlayerValidation = {
    gameInstanceID: gameID,
    playerID: '',
  };

  sessionStorage.setItem('__current_game__', JSON.stringify(__current_game__));
  return redirect(`/games/${id}/register`);
};
