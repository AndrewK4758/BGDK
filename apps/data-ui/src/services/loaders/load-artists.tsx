import axios from 'axios';
import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';

const loadArtists: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const baseURL = import.meta.env.VITE_DATA_API_URL;

  try {
    const resp = await axios.get(`${baseURL}/artists`);

    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

export default loadArtists;
