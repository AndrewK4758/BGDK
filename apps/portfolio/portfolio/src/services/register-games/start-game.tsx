import axios from 'axios';
import gamesAutoStartError from '../../errors/games-auto-start-error';

const baseUrl = import.meta.env.VITE_GAMES_API_URL;

const startGame = async (gameName: string, __current_game__: string) => {
  try {
    const resp = await axios.patch(
      `${baseUrl}/games/${gameName}/start`,
      {},
      { headers: { 'current-game': __current_game__ } },
    );

    return resp.data;
  } catch (error) {
    console.error(error);
    return gamesAutoStartError(`starting ${gameName}`);
  }
};

export default startGame;
