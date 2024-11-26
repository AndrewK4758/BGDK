import { AvatarTotem, Color } from '../types/game';
import { IDie } from './die';
import { ISpace } from './space';

import type { ILiteSpace } from './lite-space';

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
  displayGameBoard(): ILiteSpace[];
}
