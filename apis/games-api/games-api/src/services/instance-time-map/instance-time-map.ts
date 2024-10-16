import { getCurrentMinute } from '@bgdk/instance-of-game';
import { IInstanceTimeMap } from '@bgdk/types-api';
import { GameInstanceID, GamesInMinute, Minute } from '@bgdk/types-game';
import updateInstanceTimeMap from '../prisma/instance-time-map/update-instance-time-map.js';
import getInstanceTimeMapValue from '../prisma/instance-time-map/get-one-value-instance-time-map.js';

export class InstanceTimeMap implements IInstanceTimeMap {
  Map: Map<Minute, GamesInMinute>;
  constructor() {
    this.Map = new Map<Minute, GamesInMinute>();
    for (let i = 0; i <= 24 * 60; i++) {
      this.Map.set(i, []);
    }
    this.Map.set(2000, []);
  }

  addGameInstance(minute: Minute, gameInstanceID: GameInstanceID): void {
    this.Map.get(minute)?.push(gameInstanceID);
  }
}

export const reaper = (instanceTimeMap: IInstanceTimeMap) => {
  const dayMinusOneMinuteInMilli = 24 * 60 * 59 * 1000;
  setTimeout(() => {
    setInterval(async () => {
      const currentMinute = getCurrentMinute();
      const minuteAhead = currentMinute === 1440 ? 0 : currentMinute + 1;

      if (minuteAhead === 0) {
        instanceTimeMap.Map.set(2000, []);
        await updateInstanceTimeMap(2000, null);
      }
      const dayOldGames = instanceTimeMap.Map.get(minuteAhead);
      const dayOldGamesDB = await getInstanceTimeMapValue(minuteAhead);
      dayOldGamesDB.games_in_minute.forEach(async game => await updateInstanceTimeMap(2000, game));
      instanceTimeMap.Map.get(2000).push(...dayOldGames);
      await updateInstanceTimeMap(minuteAhead, null);
      instanceTimeMap.Map.set(minuteAhead, []);
    }, 60 * 1000);
  }, dayMinusOneMinuteInMilli);
};
