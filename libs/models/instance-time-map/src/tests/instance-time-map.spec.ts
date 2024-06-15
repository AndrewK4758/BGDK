import { getCurrentMinute } from '@aklapper/instance-of-game';
import { GameInstanceID, Minute } from '@aklapper/game-types';
import { InstanceTimeMap } from '../lib/instance-time-map';

let instanceMap: InstanceTimeMap,
  minute: Minute,
  gameInstanceID: GameInstanceID;

describe('test instance map class', () => {
  beforeAll(() => {
    minute = getCurrentMinute();
    gameInstanceID = 'G@Me!D';
    instanceMap = new InstanceTimeMap();
  });
  test('Instance Map', () => {
    instanceMap.addGameInstance(minute, gameInstanceID);

    expect(instanceMap.Map.size).toEqual(1441); //minutes in a day plus one to hold values for 24 hours
    expect(instanceMap.Map.get(minute)).toEqual([gameInstanceID]);
  });
});
