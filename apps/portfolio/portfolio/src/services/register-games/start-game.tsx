import axios from 'axios';
import gamesAutoStartError from '../../errors/games-auto-start-error';
import type { GamePlayerValidation } from '@bgdk/types-game';

const baseUrl = import.meta.env.VITE_GAMES_API_URL;

const startGame = async (gameName: string, __current_game__: GamePlayerValidation) => {
  try {
    const resp = await axios.patch(
      `${baseUrl}/games/${gameName}/start`,
      {},
      { headers: { 'current-game': JSON.stringify(__current_game__) } },
    );

    return resp.data;
  } catch (error) {
    console.error(error);
    return gamesAutoStartError(`starting ${gameName}`);
  }
};

export default startGame;
