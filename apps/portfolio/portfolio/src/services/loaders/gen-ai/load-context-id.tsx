import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';
import { getContextId } from '@bgdk/utils';

const baseUrl = import.meta.env.VITE_SERVER_URL_VERTEX;

const loadContextId: LoaderFunction = async () => {
  try {
    const contextId = getContextId('context-id');

    if (contextId) {
      return null;
    } else {
      const resp = await axios.get(`${baseUrl}/context-id`);

      sessionStorage.setItem('context-id', resp.data);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default loadContextId;
