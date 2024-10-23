import { SpaceType } from '../types/game';
import { IAvatar } from './avatar';

export interface ISpace {
  Value: string;
  Type: SpaceType;
  Previous: ISpace;
  Next: ISpace;
  Special: ISpace | null;
  AvatarsInSpace: IAvatar[];
  Display: string | number;

  value: string;
  type: SpaceType;
  previous: ISpace;
  next: ISpace;
  special: ISpace | null;
  avatarsInSpace: IAvatar[];
  display: string | number;
  occupied: boolean;

  land(avatar: IAvatar): void;
  leave(): void;
  ifOccupied(): void;
}
