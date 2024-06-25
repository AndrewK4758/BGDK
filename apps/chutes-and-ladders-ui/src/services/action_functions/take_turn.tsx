import axios from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';
import { getGameInstanceInfo } from '../utils/utils';

const takeTurn = async ({ params }: ActionFunctionArgs) => {
  const __baseURL__ = import.meta.env.VITE_REST_API_SERVER_URL;
  const __current_game__ = JSON.stringify(getGameInstanceInfo());
  const id = params.id;

  try {
    const resp = await axios.patch(
      `${__baseURL__}/games/${id}/take-turn`,
      {},
      { headers: { 'current-game': __current_game__ } }
    );
    console.log(resp.data.turnStatus);

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default takeTurn;
