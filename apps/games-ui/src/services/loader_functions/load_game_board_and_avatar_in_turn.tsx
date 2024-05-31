import { IPlayersAndBoard } from '@aklapper/model';
import axios from 'axios';
import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { getGameInstanceInfo } from '../utils';

export const loadGameBoardAndAvatarInTurn: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const id = params.id;
  const baseURL = import.meta.env.VITE_API_SERVER_URL;
  const __current_game__ = JSON.stringify(getGameInstanceInfo());

  try {
    const resp = await axios.patch(
      `${baseURL}/games/${id}/board`,
      {},
      { headers: { 'current-game': __current_game__ } }
    );

    const activePlayerDataToSend: IPlayersAndBoard = {
      winner: resp.data.message,
      gameBoard: resp.data.gameBoard,
      playerInTurn: resp.data.playerInTurn,
      activePlayersInGame: resp.data.activePlayersInGame,
    };
    console.log(activePlayerDataToSend);
    return activePlayerDataToSend;
  } catch (error) {
    console.log(error);
    return null;
  }
};
