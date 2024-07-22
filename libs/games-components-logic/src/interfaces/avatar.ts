import { Color } from '@bgdk/types-game';
import { Space } from '../lib/space';

export interface IAvatar {
  Name: string;
  Color: Color;
  Location: Space | undefined;
}
