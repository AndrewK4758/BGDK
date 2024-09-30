import { GamePlayerValidation } from '@bgdk/types-game';

const getGameInstanceInfo = (): GamePlayerValidation | undefined => {
  const fromSession = sessionStorage.getItem('__current_game__') as string;
  return fromSession ? (JSON.parse(fromSession) as GamePlayerValidation) : undefined;
};

export default getGameInstanceInfo;
