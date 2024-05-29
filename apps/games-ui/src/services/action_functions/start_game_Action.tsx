import axios from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';

export default async function startGame({ params }: ActionFunctionArgs) {
  const __baseURL__ = import.meta.env.VITE_API_SERVER_URL;
  const __current_game__ = sessionStorage.getItem('__current_game__');
  const name = params.name;

  try {
    axios.patch(
      `${__baseURL__}/games/${name}/start`,
      {},
      { headers: { 'current-game': __current_game__ } }
    );
    return null;
  } catch (error) {
    console.log(error);
  }
}
