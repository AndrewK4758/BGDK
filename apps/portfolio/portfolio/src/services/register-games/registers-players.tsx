import axios from 'axios';
import { Color, type GamePlayerValidation, type IRegisterFormValues } from '@bgdk/types-game';
import gamesAutoStartError from '../../errors/games-auto-start-error';

const baseUrl = import.meta.env.VITE_GAMES_API_URL;

const registerPlayers = async (gameName: string, __current_game__: GamePlayerValidation) => {
  const avatar1Name = gameName === 'Chutes-&-Ladders' ? 'XENOMORPH' : 'X';
  const avatar2Name = gameName === 'Chutes-&-Ladders' ? 'PREDATOR' : 'O';

  try {
    const guestPlayers: IRegisterFormValues[] = [
      {
        playerName: 'Guest Player 1',
        avatarName: avatar1Name,
        avatarColor: Color.BLACK,
      },

      {
        playerName: 'Guest Player 2',
        avatarName: avatar2Name,
        avatarColor: Color.GREEN,
      },
    ];

    let registeredPlayerCount = 0;
    for (let i = 0; i < guestPlayers.length; i++) {
      const player = guestPlayers[i];

      const resp = await axios.patch(`${baseUrl}/games/${gameName}/register`, player, {
        headers: { 'current-game': JSON.stringify(__current_game__) },
      });

      if (resp) registeredPlayerCount += 1;
    }
    return registeredPlayerCount === 2;
  } catch (error) {
    console.error(error);
    return gamesAutoStartError(`auto registering players for ${gameName}`);
  }
};

export default registerPlayers;
