import { InstanceOfGame } from '@bgdk/instance-of-game';
import { Request } from 'express';
import { GamePlayerValidation } from '@bgdk/types-game';

const useActiveGameInstance = (req: Request): InstanceOfGame | null => {
  if (req.header('current-game') && req.allGamesMap) {
    const { gameInstanceID } = JSON.parse(req.header('current-game') as string) as GamePlayerValidation;
    return req.allGamesMap.AllGames.get(gameInstanceID as string) as InstanceOfGame;
  } else return null;
};

export default useActiveGameInstance;
