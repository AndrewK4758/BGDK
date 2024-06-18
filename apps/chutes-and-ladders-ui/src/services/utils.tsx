import { GamePlayerValidation } from '@bgdk/game-types';

export const getGameInstanceInfo = (): GamePlayerValidation | undefined => {
  const fromSession = sessionStorage.getItem('__current_game__') as string;
  return fromSession
    ? (JSON.parse(fromSession) as GamePlayerValidation)
    : undefined;
};
