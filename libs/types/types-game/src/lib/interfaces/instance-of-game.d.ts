import type { GameInstanceID, Minute } from '../types/game';
import { IGame } from './game';
export interface IInstanceOfGame {
    gameInstanceID: GameInstanceID;
    instanceTime: Minute;
    lastActive: Minute;
    instance: IGame;
    updateLastActive(minute: Minute): void;
}
//# sourceMappingURL=instance-of-game.d.ts.map