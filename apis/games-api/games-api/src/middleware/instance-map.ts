import { InstanceTimeMap, reaper } from '../services/instance-time-map/instance-time-map.ts';

export const instanceMap = new InstanceTimeMap();

const useInstanceTimeMap = (): InstanceTimeMap => instanceMap;

reaper(instanceMap);

export default useInstanceTimeMap;
