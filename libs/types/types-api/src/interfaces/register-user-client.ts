import { EmailAddress } from '../types/register-user.js';
import type { Multer } from 'multer';

export interface IRegisterUserClient {
  firstName: string;
  lastName: string;
  email: EmailAddress;
  playerName: string;
  password: string;
  thumbnail?: File | string | Multer;
}
