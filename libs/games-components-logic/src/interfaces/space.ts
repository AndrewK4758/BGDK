import { SpaceType } from '@bgdk/types-game';
import { IAvatar } from '../interfaces/avatar';

export interface ISpace {
  Value: string;
  Type: SpaceType;
  Previous: ISpace;
  Next: ISpace;
  Special: ISpace | null;
  AvatarsInSpace: IAvatar[];
  Display: string | number;
  get value(): string;
  get type(): SpaceType;
  get previous(): ISpace;
  set previous(previous: ISpace);
  get next(): ISpace;
  set next(next: ISpace);
  get special(): ISpace | null;
  set special(special: ISpace);
  get occupied(): boolean;
  get avatarsInSpace(): IAvatar[];
  get display(): string;
  set display(displayToken: string);

  land(avatar: IAvatar): void;
  leave(): void;
  ifOccupied(): void;
}
