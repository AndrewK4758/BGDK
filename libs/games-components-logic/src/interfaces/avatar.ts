import { Color } from '@bgdk/types-game';
import { ISpace } from './space';

export interface IAvatar {
  Name: string;
  Color: Color;
  Location: ISpace | undefined;
  get name(): string;
  get color(): Color;
  get location(): ISpace;
  set location(location: ISpace);
  move(numberOfSpaces: number): void;
  _moveForward(numberOfSpaces: number): ISpace | null;
  _moveBackward(numberOfSpaces: number): ISpace | null;
}
