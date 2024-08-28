import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const loadArtists: LoaderFunction = async () => {
  try {
    const resp = await axios.get(`${baseURL}/artists-count`);

    return parseInt(resp.data as string, 10);
  } catch (error) {
    console.error(error);
  }
};

export default loadArtists;
