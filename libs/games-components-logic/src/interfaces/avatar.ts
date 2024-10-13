import { Color } from '@bgdk/types-game';
import { Space } from '../lib/space.ts';

export interface IAvatar {
  Name: string;
  Color: Color;
  Location: Space | undefined;
}
