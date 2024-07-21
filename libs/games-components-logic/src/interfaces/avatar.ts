import { Color } from '@bgdk/types-game';
import { Space } from '../lib/space';

export interface IAvatar {
  Name: string;
  Color: Color;
  Location: Space | undefined;
  get name(): string;
  get color(): Color;
  get location(): Space;
  set location(location: Space);
  move(numberOfSpaces: number): void;
  _moveForward(numberOfSpaces: number): Space | null;
  _moveBackward(numberOfSpaces: number): Space | null;
}
