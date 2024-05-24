import { GamePlayerValidation } from '@aklapper/model';

export const getGameInstanceInfo = (): GamePlayerValidation | undefined => {
  const fromSession = sessionStorage.getItem('__current_game__');
  return fromSession
    ? (JSON.parse(fromSession) as GamePlayerValidation)
    : undefined;
};
