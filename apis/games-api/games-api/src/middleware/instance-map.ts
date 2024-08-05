import { NextFunction, Response } from 'express';
import { InstanceTimeMap, reaper } from '../services/instance-time-map/instance-time-map';
import { IReqObjMaps } from '@bgdk/types-api';

export const instanceMap = new InstanceTimeMap();

const useInstanceTimeMap = (req: IReqObjMaps, _resp: Response, next: NextFunction): void => {
  req.instanceMap = instanceMap;
  next();
};

reaper(instanceMap);

export default useInstanceTimeMap;
