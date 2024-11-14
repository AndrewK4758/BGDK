import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';
import { getCookie } from '@bgdk/utils';

const baseUrl = import.meta.env.VITE_SERVER_URL_VERTEX;

const loadContextId: LoaderFunction = async () => {
  try {
    const cookie = getCookie('context-id', document.cookie);

    if (cookie) {
      return null;
    } else {
      await axios.get(`${baseUrl}/context-id`, { withCredentials: true });

      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default loadContextId;
