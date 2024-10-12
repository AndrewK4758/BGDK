import { createContext, type Dispatch, type ReactElement, type SetStateAction, useMemo, useState } from 'react';

export type GameContextInfo = {
  playerIds: string[];
  gameName: string;
};

export interface GameContextProps {
  setGameContext: Dispatch<SetStateAction<GameContextInfo>>;
  GameContextValues: GameContextInfo;
}

const gameContextInit: GameContextInfo = {
  playerIds: [],
  gameName: '',
};

export const GameContext = createContext<GameContextProps | null>(null);

interface GameContextProviderProps {
  children: ReactElement | ReactElement[];
}

const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [gameContext, setGameContext] = useState<GameContextInfo>(gameContextInit);
  const GameContextValues = useMemo(() => gameContext, [gameContext]);
  return <GameContext.Provider value={{ GameContextValues, setGameContext }}>{children}</GameContext.Provider>;
};

export default GameContextProvider;
