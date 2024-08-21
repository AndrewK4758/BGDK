import { IRegisterUserClient } from '@bgdk/types-api';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { IActionError } from '../../../../interfaces/action-error';

const registerUserAction = async (
  values: IRegisterUserClient,
  setRegisterError: Dispatch<SetStateAction<IActionError | null>>,
) => {
  console.log('in subimt func');
  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;
  const { firstName, lastName, email, playerName, password, thumbnail }: IRegisterUserClient = values;

  const reqHeaders: Partial<AxiosRequestConfig> = {
    headers: {
      'current-game': sessionStorage.getItem('__current_game__'),
      'Content-Type': 'multipart/form-data',
    },
  };

  const registerUserForm = new FormData();

  registerUserForm.append('thumbnail', thumbnail as string | Blob);
  registerUserForm.append('firstName', firstName);
  registerUserForm.append('lastName', lastName);
  registerUserForm.append('email', email);
  registerUserForm.append('password', password);
  registerUserForm.append('playerName', playerName);

  try {
    const resp = await axios.post(`${baseURL}/register-user`, registerUserForm, reqHeaders);
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    console.error(err);
    const { response } = err as AxiosError;
    setRegisterError(response?.data as IActionError);
  }
};

export default registerUserAction;
