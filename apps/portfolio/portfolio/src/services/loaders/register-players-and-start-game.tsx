import { Color, type GamePlayerValidation, type IRegisterFormValues } from '@bgdk/types-game';
import axios from 'axios';
import type { ActionFunction, ActionFunctionArgs } from 'react-router-dom';
import getGameInstanceInfo from '../../utils/utils';
import { redirect } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_GAMES_API_URL;

const registerPlayersAndStartGame: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  try {
    let __current_game__;
    const playerIds: string[] = [];
    const gameName = await request.text();

    const resp = await axios.post(`${baseUrl}/games/${gameName}`);

    sessionStorage.setItem('__current_game__', resp.headers['current-game']);

    if (resp.status === 201) {
      const guestPlayers: IRegisterFormValues[] = [
        {
          playerName: 'Guest Player 1',
          avatarName: gameName === 'Chutes-&-Ladders' ? 'XENOMORPH' : 'X',
          avatarColor: Color.BLACK,
        },

        {
          playerName: 'Guest Player 2',
          avatarName: gameName === 'Chutes-&-Ladders' ? 'PREDATOR' : 'O',
          avatarColor: Color.GREEN,
        },
      ];

      try {
        for (let i = 0; i < guestPlayers.length; i++) {
          const player = guestPlayers[i];
          __current_game__ = JSON.stringify(getGameInstanceInfo() as GamePlayerValidation);

          const resp = await axios.patch(`${baseUrl}/games/${gameName}/register`, player, {
            headers: { 'current-game': __current_game__ },
          });

          const playerId = (JSON.parse(resp.headers['current-game']) as GamePlayerValidation).playerID;
          if (playerId) playerIds.push(playerId as string);

          if (playerIds.length === 2) {
            try {
              await axios.patch(
                `${baseUrl}/games/${gameName}/start`,
                {},
                { headers: { 'current-game': __current_game__ } },
              );

              const tempCurrentGame = JSON.parse(__current_game__) as GamePlayerValidation;
              tempCurrentGame.playerID = playerIds;
              sessionStorage.setItem('__current_game__', JSON.stringify(tempCurrentGame));
              sessionStorage.setItem('playersIds', JSON.stringify(playerIds));
              return redirect(gameName as string);
            } catch (error) {
              console.error(error);
              return null;
            }
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default registerPlayersAndStartGame;
