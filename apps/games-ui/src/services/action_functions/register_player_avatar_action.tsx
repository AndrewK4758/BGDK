import { IRegisterFormValues } from '@aklapper/game-types';
import axios from 'axios';
import { ActionFunction, ActionFunctionArgs } from 'react-router-dom';
import { getGameInstanceInfo } from '../utils';

export const registerPlayerAndAvatarAction: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const baseURL = import.meta.env.VITE_API_SERVER_URL;
  const id = params.id;
  const __current_game__ = JSON.stringify(getGameInstanceInfo());

  const data = await request.json();

  const avatarName = data.avatarName;
  const playerName = data.playerName;
  const avatarColor = data.avatarColor;

  const registerFormValues = {
    playerName: playerName,
    avatarName: avatarName,
    avatarColor: avatarColor,
  } as IRegisterFormValues;

  try {
    const resp = await axios.patch(
      `${baseURL}/games/${id}/register`,
      registerFormValues,
      {
        headers: {
          'current-game': __current_game__,
        },
      }
    );

    sessionStorage.setItem('__current_game__', resp.headers['current-game']);

    return resp.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
