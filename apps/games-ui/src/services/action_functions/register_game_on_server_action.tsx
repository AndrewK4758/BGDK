import axios from 'axios';
import { ActionFunction, ActionFunctionArgs, redirect } from 'react-router-dom';

export const registerGameInstanceOnServerAction: ActionFunction = async ({ params }: ActionFunctionArgs) => {
  const baseURL = import.meta.env.VITE_API_SERVER_URL;
  const id = params.id;

  try {
    const resp = await axios.post(`${baseURL}/games/${id}`, {});

    sessionStorage.setItem('__current_game__', resp.headers['current-game']);

    return redirect(`register`);
  } catch (error) {
    console.log(error);
    return null;
  }
};
