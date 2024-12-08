import { GamePlayerValidation } from '@bgdk/types-game';

/**
 * This function retrieves game instance information from session storage.
 *
 * @returns {GamePlayerValidation | undefined} The game instance information if found in session storage, otherwise undefined.
 */

const getGameInstanceInfo = (): GamePlayerValidation | undefined => {
  const fromSession = sessionStorage.getItem('__current_game__') as string;
  return fromSession ? (JSON.parse(fromSession) as GamePlayerValidation) : undefined;
};

export default getGameInstanceInfo;
