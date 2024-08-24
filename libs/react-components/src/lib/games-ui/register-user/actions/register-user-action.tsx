import { IRegisterUserClient } from '@bgdk/types-api';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { IActionError } from '../../../../interfaces/action-error';

const registerUserAction = async (
  values: IRegisterUserClient,
  setRegisterError: Dispatch<SetStateAction<IActionError | null>>,
) => {

  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;
  const { firstName, lastName, email, playerName, password, thumbnail }: IRegisterUserClient = values;

  const reqHeaders: Partial<AxiosRequestConfig> = {
    headers: {
      'current-game': sessionStorage.getItem('__current_game__'),
      'Content-Type': 'multipart/form-data',
    },
  };

  const registerUserData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    playerName: playerName,
    password: password,
    thumbnail: thumbnail,
  };

  try {
    const resp = await axios.postForm(`${baseURL}/register-user`, registerUserData, reqHeaders);
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    console.error(err);
    const { response } = err as AxiosError;
    setRegisterError(response?.data as IActionError);
  }
};

export default registerUserAction;
