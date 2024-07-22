import { NextFunction, Response } from 'express';
import { InstanceTimeMap, reaper } from '../../services/instance-time-map/instance-time-map';
import { IReqObjMaps } from '@bgdk/types-api';

export const instanceMap = new InstanceTimeMap();
reaper(instanceMap);

const useInstanceTimeMap = (req: IReqObjMaps, resp: Response, next: NextFunction) => {
  req.instanceMap = instanceMap;

  next();
};
export default useInstanceTimeMap;
