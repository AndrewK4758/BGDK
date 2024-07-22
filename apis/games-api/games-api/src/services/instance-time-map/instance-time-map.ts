import { getCurrentMinute } from '@bgdk/instance-of-game';
import { IInstanceTimeMap } from '@bgdk/types-api';
import { GameInstanceID, GamesInMinute, Minute } from '@bgdk/types-game';

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
  const now = new Date();
  const startTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  setTimeout(() => {
    let previousDay = instanceTimeMap.Map.get(2000);
    previousDay = [];

    setInterval(() => {
      const minute = getCurrentMinute();
      let valsToMove = instanceTimeMap.Map.get(minute);
      if (valsToMove && previousDay) {
        previousDay.push(...valsToMove);
        valsToMove = [];
      }
    }, 60 * 1000);
  }, startTime.getTime() - now.getTime());
};
