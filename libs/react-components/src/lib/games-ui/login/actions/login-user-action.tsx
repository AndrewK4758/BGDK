import axios, { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { ActiveUserData } from '../../header/header';
import { IActionError } from '../../../../interfaces/action-error';
import { GamePlayerValidation } from '@bgdk/types-game';
import { LoginDataProps } from '../validations/login-validation-schema';

const loginUserAction = async (
  values: LoginDataProps,
  setActiveUser: Dispatch<SetStateAction<ActiveUserData>>,
  setLoginError: Dispatch<SetStateAction<IActionError>>,
) => {
  const baseURL = import.meta.env.VITE_REST_API_SERVER_URL;
  try {
    const resp = await axios.patch(`${baseURL}/login`, { email: values.email, password: values.password });

    const gameID = sessionStorage.getItem('__current_game__')
      ? (JSON.parse(sessionStorage.getItem('__current_game__') as string) as GamePlayerValidation).gameInstanceID
      : '';
    setActiveUser(resp.data);
    const __current_game__ = { gameInstanceID: gameID, playerID: resp.data.id } as GamePlayerValidation;
    sessionStorage.setItem('__current_game__', JSON.stringify(__current_game__));
  } catch (err) {
    console.error(err);
    const { response } = err as AxiosError;
    setLoginError(response?.data as IActionError);
  }
};

export default loginUserAction;
