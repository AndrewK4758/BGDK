import { GameInstanceID } from '@bgdk/types-game';

export type email = `${string}@${string}.${string}`; // /^[a-zA-Z0-9. _%+\\-!~]+@[a-zA-Z0-9-_.]+.[a-zA-Z]{2,}$/gi;

export interface IRegisterUser {
  id: GameInstanceID;
  firstName: string;
  lastName: string;
  email: email;
  createdOn: Date;
  hoursLoggedIn: number;
  activeGames: GameInstanceID[];
  password: string;
}
