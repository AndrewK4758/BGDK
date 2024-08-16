import { IRegisterUserClient } from '@bgdk/types-api';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { ActionFunction, ActionFunctionArgs, redirect } from 'react-router-dom';

const registerUserAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const { firstName, lastName, email, playerName, password }: IRegisterUserClient = await request.json();
  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;
  console.log(baseURL);
  try {
    const resp = await axios.post(`${baseURL}/register-user`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      playerName: playerName,
      password: password,
    });

    redirect('/');
    return resp.data;
  } catch (err) {
    const { response } = err as AxiosError;
    console.error(err);
    return response?.data;
  }
};

export default registerUserAction;
