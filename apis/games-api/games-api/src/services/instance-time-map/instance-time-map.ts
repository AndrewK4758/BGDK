import { getCurrentMinute } from '@bgdk/instance-of-game';
import { IInstanceTimeMap } from '@bgdk/types-api';
import { GameInstanceID, GamesInMinute, Minute } from '@bgdk/types-game';
import updateInstanceTimeMap from '../prisma/instance-time-map/update-instance-time-map';
import getInstanceTimeMapValue from '../prisma/instance-time-map/get-one-value-instance-time-map';

export class InstanceTimeMap implements IInstanceTimeMap {
  Map: Map<Minute, GamesInMinute>;
  constructor() {
    this.Map = new Map<Minute, GamesInMinute>();
    for (let i = 0; i < 24 * 60; i++) {
      this.Map.set(i, []);
    }
    this.Map.set(2000, []);
  }

  addGameInstance(minute: Minute, gameInstanceID: GameInstanceID): void {
    this.Map.get(minute)?.push(gameInstanceID);
  }
}

export const reaper = (instanceTimeMap: IInstanceTimeMap) => {
  const dayInMilli = 24 * 60 * 60 * 1000;
  setTimeout(() => {
    setInterval(async () => {
      const currentMinute = getCurrentMinute();
      const minute = currentMinute === 1440 ? 0 : currentMinute + 1;

      if (minute === 0) {
        instanceTimeMap.Map.set(2000, []);
        await updateInstanceTimeMap(2000, null);
      }
      const dayOldGames = instanceTimeMap.Map.get(minute);
      const dayOldGamesDB = await getInstanceTimeMapValue(minute);
      dayOldGamesDB.games_in_minute.forEach(async game => await updateInstanceTimeMap(2000, game));
      instanceTimeMap.Map.get(2000).push(...dayOldGames);
      await updateInstanceTimeMap(minute, null);
      instanceTimeMap.Map.set(minute, []);
    }, 59 * 1000);
  }, dayInMilli);
};
