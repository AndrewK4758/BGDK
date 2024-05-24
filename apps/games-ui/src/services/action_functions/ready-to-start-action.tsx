import axios from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';
import { getGameInstanceInfo } from '../utils';

export default async function readyToStartAction({ params }: ActionFunctionArgs) {
  const __baseURL__ = import.meta.env.VITE_API_SERVER_URL;
  const id = params.id;
  const __current_game__ = JSON.stringify(getGameInstanceInfo());

  console.log('action called');
  try {
    const resp = await axios.patch(
      `${__baseURL__}/games/${id}/start`,
      {},
      { headers: { __current_game__: __current_game__ } }
    );
    console.log(resp.data.message);
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
