import { EmailAddress } from '../types/register-user';
import type Express from 'multer';

export interface IRegisterUserClient {
  firstName: string;
  lastName: string;
  email: EmailAddress;
  playerName: string;
  password: string;
  thumbnail?: File | string | Express.Multer;
}
