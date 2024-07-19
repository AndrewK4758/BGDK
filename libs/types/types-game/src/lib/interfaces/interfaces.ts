import { Color, SpaceType } from '../types/game';


export interface IPlayer {
  Name: string;
  Id: string;
  Order: number;
  Avatar: IAvatar;
  get name(): string;
  get id(): string;
  get order(): number;
  set order(order: number);
  get avatar(): IAvatar;
  set avatar(avatar: IAvatar);
}

export interface IAvatar {
  Name: string;
  Color: Color;
  Location: ISpace | undefined;
  get name(): string;
  get color(): Color;
  get location(): ISpace;
  set location(location: ISpace);
  move(numberOfSpaces: number): void;
}

export interface ILiteSpace {
  display: string;
}

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

export interface IBoard {
  boardSetup(): void;
}

export interface IDie {
  get sides(): number;
  roll(): number;
}

export interface ISummedRoll {
  get rollValues(): number[];
  get sum(): number;
}
