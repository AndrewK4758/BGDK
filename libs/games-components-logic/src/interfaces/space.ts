import { SpaceType } from '@bgdk/types-game';
import { Avatar } from '../lib/avatar.ts';

export interface ISpace {
  Value: string;
  Type: SpaceType;
  Previous: ISpace;
  Next: ISpace;
  Special: ISpace | null;
  AvatarsInSpace: Avatar[];
  Display: string | number;
}
