import axios from 'axios';
import { ActionFunction, ActionFunctionArgs, redirect } from 'react-router-dom';
import getGameInstanceInfo from '../utils/utils';

const registerGameInstanceOnServerAction: ActionFunction = async ({ params }: ActionFunctionArgs) => {
  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;
  const id = params.id;

  const __current_game__ = JSON.stringify(getGameInstanceInfo());

  try {
    const resp = await axios.post(
      `${baseURL}/games/${id}`,
      {},
      {
        headers: {
          'current-game': __current_game__,
        },
      },
    );

    sessionStorage.setItem('__current_game__', resp.headers['current-game']);

    return redirect(`register`);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default registerGameInstanceOnServerAction;
