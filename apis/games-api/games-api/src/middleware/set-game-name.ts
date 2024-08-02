import { Response, NextFunction } from 'express';
import { IReqObjMaps } from '@bgdk/types-api';
import { GameNameString } from '@bgdk/types-game';

const useSetSelectedGameName = async (req: IReqObjMaps, _resp: Response, next: NextFunction): Promise<void> => {
  const selectedGameName: GameNameString = req.params['id'].replace(/-/g, ' ');
  req.selectedGameName = selectedGameName;
  next();
};

export default useSetSelectedGameName;
