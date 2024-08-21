import { InstanceOfGame } from '@bgdk/instance-of-game';
import { IReqObjMaps } from '@bgdk/types-api';
import { GamePlayerValidation } from '@bgdk/types-game';

const useActiveGameInstance = (req: IReqObjMaps): InstanceOfGame => {
  if (req.header('current-game') && req.allGamesMap) {
    const { gameInstanceID } = JSON.parse(req.header('current-game')) as GamePlayerValidation;
    return req.allGamesMap.AllGames.get(gameInstanceID);
  }
};

export default useActiveGameInstance;
