import axios from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';

export default async function startGame({ params }: ActionFunctionArgs) {
  const __current_game__ = sessionStorage.getItem('__current_game__');
  const name = params.name;

  try {
    axios.patch(
      `http://localhost:3333/api/v1/games/${name}/start`,
      {},
      { headers: { __current_game__: __current_game__ } }
    );
    return null;
  } catch (error) {
    console.log(error);
  }
}
