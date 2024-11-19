import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';
import { getContextPath } from '@bgdk/utils';

const baseUrl = import.meta.env.VITE_SERVER_URL_VERTEX;

const loadContextPath: LoaderFunction = async () => {
  try {
    const contextId = getContextPath('context-path');

    if (contextId) {
      return null;
    } else {
      const resp = await axios.get(`${baseUrl}/context-path`);

      sessionStorage.setItem('context-path', resp.data);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default loadContextPath;
