import { getCurrentMinute } from '@bgdk/instance-of-game';
import { GameInstanceID, Minute } from '@bgdk/types-game';
import { InstanceTimeMap } from '../../services/instance-time-map/instance-time-map.js';

let instanceMap: InstanceTimeMap, minute: Minute, gameInstanceID: GameInstanceID;

describe('test instance map class', () => {
  beforeAll(() => {
    minute = getCurrentMinute();
    gameInstanceID = 'G@Me!D';
    instanceMap = new InstanceTimeMap();
  });
  afterAll(() => {
    instanceMap.Map.clear();
  });
  test('Instance Map', () => {
    instanceMap.addGameInstance(minute, gameInstanceID);

    expect(instanceMap.Map.size).toEqual(1442); //minutes in a day plus one to hold values for 24 hours
    expect(instanceMap.Map.get(minute)).toEqual([gameInstanceID]);
  });
});
