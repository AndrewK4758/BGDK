import { Minute, GameInstanceID } from '@bgdk/game-types';
import { IGame } from '@bgdk/game';

export const getCurrentMinute = (): Minute =>
  (new Date().getHours() * 60 + new Date().getMinutes()) as Minute;

export interface IInstanceOfGame {
  gameInstanceID: GameInstanceID;
  instanceTime: Minute;
  lastActive: Minute;
  instance: IGame;
  updateLastActive(minute: Minute): void;
}

export class InstanceOfGame implements IInstanceOfGame {
  gameInstanceID: GameInstanceID;
  instanceTime: Minute;
  lastActive: Minute;
  instance: IGame;
  constructor(minute: Minute, gameInstanceID: GameInstanceID, instance: IGame) {
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
