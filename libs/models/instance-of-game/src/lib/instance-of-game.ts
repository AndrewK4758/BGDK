import { IGame } from '@bgdk/game';
import { GameInstanceID, Minute } from '@bgdk/types-game';
import { Game } from '@bgdk/game';

export const getCurrentMinute = (): Minute => (new Date().getHours() * 60 + new Date().getMinutes()) as Minute;

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
