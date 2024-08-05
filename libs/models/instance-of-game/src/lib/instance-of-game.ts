import { Game } from '@bgdk/game';
import { GameInstanceID, Minute } from '@bgdk/types-game';

export const getCurrentMinute = (): Minute => {
  const currentTime = new Date();
  return currentTime.getHours() * 60 + currentTime.getMinutes();
};

export interface IInstanceOfGame {
  gameInstanceID: GameInstanceID;
  instanceTime: Minute;
  lastActive: Minute;
  instance: Game;
  updateLastActive(minute: Minute): void;
}

export class InstanceOfGame implements IInstanceOfGame {
  gameInstanceID: GameInstanceID;
  instanceTime: Minute;
  lastActive: Minute;
  instance: Game;
  constructor(minute: Minute, gameInstanceID: GameInstanceID, instance: Game) {
    this.instanceTime = minute;
    this.lastActive = minute;
    this.gameInstanceID = gameInstanceID;
    this.instance = instance;
  }

  updateLastActive(minute: Minute): void {
    // GET THE CURRENT MINUTE OF THE DAY
    this.lastActive = minute;
  }
}
