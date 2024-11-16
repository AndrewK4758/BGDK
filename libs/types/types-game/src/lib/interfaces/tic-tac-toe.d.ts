import { ISpace } from './space';
import { Color } from '../types/game';
import { AvatarTotem } from '../types/game';
import type { GameBoard } from './lite-space';
export interface ITicTacToe {
    MIN_PLAYERS: number;
    MAX_PLAYERS: number;
    startSpace: ISpace;
    avatarList: AvatarTotem[];
    colorList: typeof Color;
    makeGameBoard(): void;
    displayGameBoard(): GameBoard;
}
//# sourceMappingURL=tic-tac-toe.d.ts.map