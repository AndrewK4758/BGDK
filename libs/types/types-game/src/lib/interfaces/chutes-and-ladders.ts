import { IDie } from './die';
import { ISpace } from './space';
import { Color } from '../types/game';
import { AvatarTotem } from '../types/game';

import type { GameBoard } from './lite-space';

export interface IChutesAndLadders {
  MAX_PLAYERS: number;
  MIN_PLAYERS: number;
  CHUTES: number;
  LADDERS: number;
  DIE: IDie;
  startSpace: ISpace;
  colorList: typeof Color;
  avatarList: AvatarTotem[];

  makeGameBoard(): void;
  displayGameBoard(): GameBoard;
}
