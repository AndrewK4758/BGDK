import { GameInstanceID } from '@bgdk/types-game';
import { USER_ROLE } from '../types/register-user.ts';
import { IRegisterUserClient } from './register-user-client.ts';

export interface IRegisterUser extends IRegisterUserClient {
  id: string;
  createdOn: Date;
  activeGames?: GameInstanceID[];
  friends?: string[];
  role: USER_ROLE;
}
