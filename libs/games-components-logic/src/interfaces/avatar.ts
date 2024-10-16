import { Color } from '@bgdk/types-game';
import { Space } from '../lib/space.js';

export interface IAvatar {
  Name: string;
  Color: Color;
  Location: Space | undefined;
}
