import { EmailAddress } from '../types/register-user';

export interface IRegisterUserClient {
  firstName: string;
  lastName: string;
  email: EmailAddress;
  playerName: string;
  password: string;
}
