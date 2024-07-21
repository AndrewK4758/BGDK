import { SpaceType } from '@bgdk/types-game';
import { Avatar } from '../lib/avatar';

export interface ISpace {
  Value: string;
  Type: SpaceType;
  Previous: ISpace;
  Next: ISpace;
  Special: ISpace | null;
  AvatarsInSpace: Avatar[];
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
  get avatarsInSpace(): Avatar[];
  get display(): string;
  set display(displayToken: string);

  land(avatar: Avatar): void;
  leave(): void;
  ifOccupied(): void;
}
