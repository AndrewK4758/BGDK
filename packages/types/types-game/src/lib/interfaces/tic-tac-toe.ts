import { AvatarTotem, Color } from '../types/game';
import type { ILiteSpace } from './lite-space';
import { ISpace } from './space';

export interface ITicTacToe {
  MIN_PLAYERS: number;
  MAX_PLAYERS: number;
  startSpace: ISpace;
  avatarList: AvatarTotem[];
  colorList: typeof Color;

  makeGameBoard(): void;
  displayGameBoard(): ILiteSpace[];
}
