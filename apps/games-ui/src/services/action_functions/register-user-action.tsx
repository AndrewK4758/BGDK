import { IRegisterUserClient } from '@bgdk/types-api';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { ActionFunction, ActionFunctionArgs, redirect } from 'react-router-dom';
import getGameInstanceInfo from '../utils/utils';

const registerUserAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const { firstName, lastName, email, playerName, password }: IRegisterUserClient = await request.json();
  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;

  const reqHeaders = {
    headers: {
      'current-game': JSON.stringify(getGameInstanceInfo()),
    },
  };
  try {
    const resp = await axios.post(
      `${baseURL}/register-user`,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        playerName: playerName,
        password: password,
      },
      reqHeaders,
    );
    console.log(resp.data);
    return redirect('/');
  } catch (err) {
    console.error(err);
    const { response } = err as AxiosError;
    return response?.data;
  }
};

export default registerUserAction;
