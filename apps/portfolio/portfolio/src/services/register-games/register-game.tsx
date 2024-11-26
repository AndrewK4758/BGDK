import axios from 'axios';
import gamesAutoStartError from '../../errors/games-auto-start-error';

const baseUrl = import.meta.env.VITE_GAMES_API_URL;

const registerGame = async (gameName: string) => {
  try {
    const resp = await axios.post(`${baseUrl}/games/${gameName}`);

    // sessionStorage.setItem('__current_game__', resp.headers['current-game']);

    return resp.headers['current-game'];
  } catch (error) {
    console.error(error);
    return gamesAutoStartError(`registering ${gameName}`);
  }
};

export default registerGame;
