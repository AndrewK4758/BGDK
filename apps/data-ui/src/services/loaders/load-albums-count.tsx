import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';

const baseURL = import.meta.env.VITE_DATA_API_URL;

const loadAlbumsCount: LoaderFunction = async () => {
  try {
    const resp = await axios.get(`${baseURL}/albums?count=count`);

    const { count } = resp.data;
    return count;
  } catch (error) {
    console.error(error);
  }
};

export default loadAlbumsCount;
