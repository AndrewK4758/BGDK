import { IRegisterLoaderAndFilter } from '@bgdk/types-game';
import axios from 'axios';
import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import getGameInstanceInfo from '../utils/utils';

const loadPlayerAvatarRegisterFilterData: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;

  const __current_game__ = JSON.stringify(getGameInstanceInfo());

  const reqHeaders = {
    headers: {
      'current-game': __current_game__,
    },
  };

  try {
    const resp = await axios.patch(`${baseURL}/games/${id}/load-register`, {}, reqHeaders);

    if (resp.data.errorMessage) {
      const errorMessage = {
        errorMessage: resp.data.errorMessage,
      };
      return errorMessage;
    } else {
      const returnGameFunctionalityLoaderData: IRegisterLoaderAndFilter = {
        gamePlayerIDs: JSON.parse(resp.headers['current-game']),
        avatarList: resp.data.avatarList,
        avatarColorList: resp.data.avatarColorList,
      };

      return returnGameFunctionalityLoaderData;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default loadPlayerAvatarRegisterFilterData;
