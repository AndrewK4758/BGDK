import { ChutesAndLadders } from './chutes_and_ladders';

export enum Color {
  RED = 'Red',
  WHITE = 'White',
  BLUE = 'Blue',
  GREEN = 'Green',
  PURPLE = 'Purple',
  YELLOW = 'Yellow',
  ORANGE = 'Orange',
  PINK = 'Pink',
  BLACK = 'Black',
  BROWN = 'Brown',
}

export enum SpaceType {
  START = 0,
  NORMAL = 1,
  CHUTE = 2,
  LADDER = 3,
  FINISH = 4,
}

export type GameBoard = string[][];

export type AvatarTotem = {
  id: number;
  name: string;
};

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
  Location: ISpace;
  get name(): string;
  get color(): Color;
  get location(): ISpace;
  set location(location: ISpace);
  move(numberOfSpaces: number): void;
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

export interface IGame {
  instance: ChutesAndLadders;
  playersArray: IPlayer[];
  playerInTurn: IPlayer;
  readyToPlay: boolean;
  haveWinner: boolean;
  currentPlayer: number;

  register(playerName: string, id: string, avatarName: string, color: Color): void;
  generatePlayerOrder(player: IPlayer): void;
  verifyReadyToPlay(): boolean;
  rotatePlayers(): void;
  wonGame(locationType: SpaceType): boolean;
}
