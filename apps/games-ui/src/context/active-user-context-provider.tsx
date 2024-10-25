import { ActiveUserData, IActiveUserContext, ActiveUserContext } from '@bgdk/react-components';
import { ReactNode, useState } from 'react';

const activeUserInit: ActiveUserData = {
  id: undefined,
  playerName: undefined,
  activeGames: undefined,
  friends: undefined,
  thumbnail: undefined,
};

type Props = { children: ReactNode };

const ActiveUserProvider = ({ children }: Props) => {
  const [activeUser, setActiveUser] = useState<ActiveUserData>(activeUserInit);

  const values: IActiveUserContext = {
    activeUser,
    setActiveUser,
  };
  return <ActiveUserContext.Provider value={values}>{children}</ActiveUserContext.Provider>;
};

export default ActiveUserProvider;
