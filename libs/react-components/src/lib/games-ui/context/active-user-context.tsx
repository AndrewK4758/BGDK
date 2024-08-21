import { ActiveUserData } from '../header/header';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface IActiveUserContext {
  activeUser: ActiveUserData;
  setActiveUser: Dispatch<SetStateAction<ActiveUserData>>;
}

const activeUserInit: ActiveUserData = {
  id: '',
  playerName: '',
  activeGames: [],
  friends: [],
  thumbnail: '',
};

export const ActiveUserContext = createContext<IActiveUserContext>({
  activeUser: activeUserInit,
  setActiveUser: user => user,
});
