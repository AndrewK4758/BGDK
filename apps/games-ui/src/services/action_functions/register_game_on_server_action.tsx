import axios from 'axios';
import { ActionFunction, ActionFunctionArgs, redirect } from 'react-router-dom';

const registerGameInstanceOnServerAction: ActionFunction = async ({ params }: ActionFunctionArgs) => {
  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;
  const id = params.id;

  const reqHeaders = {
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  };

  try {
    const resp = await axios.post(`${baseURL}/games/${id}`, {}, reqHeaders);

    sessionStorage.setItem('__current_game__', resp.headers['current-game']);

    return redirect(`register`);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default registerGameInstanceOnServerAction;
