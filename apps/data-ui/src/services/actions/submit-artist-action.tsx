import { ActionFunction, ActionFunctionArgs } from 'react-router-dom';
import axios from 'axios';

const submitArtistAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const baseURL = import.meta.env.VITE_DATA_API_URL;
  try {
    const { name } = await request.json();

    const resp = await axios.post(`${baseURL}/artists`, { name: name });

    return resp.data;
  } catch (error) {
    console.error(error);
    return (error as Error).message;
  }
};

export default submitArtistAction;
