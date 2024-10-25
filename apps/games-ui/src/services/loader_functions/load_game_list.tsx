import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';
import getGameInstanceInfo from '../utils/utils';

const loadGameList: LoaderFunction = async () => {
  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;

  const reqHeaders = {
    headers: {
      'current-game': JSON.stringify(getGameInstanceInfo()),
      Authorization: sessionStorage.getItem('token'),
    },
  };

  const resp = await axios.get(`${baseURL}/games`, reqHeaders);

  return resp.data;
};

export default loadGameList;
