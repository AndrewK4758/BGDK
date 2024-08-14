import { email } from '../types/register-user';

export interface IRegisterUserClient {
  firstName: string;
  lastName: string;
  email: email;
  playerName: string;
  password: string;
}
