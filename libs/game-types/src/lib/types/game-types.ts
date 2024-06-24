// Make all properties on all classes that have getters/setter private

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

export const enum GameContextKeys {
  GAME = 'GAME',
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
  ACTION = 'ACTION',
  NEXT = 'NEXT-HANDLER',
  OUTPUT = 'OUT',
  SOCKET = 'SOCKET',
}

export enum TurnStatus {
  VALID = 'VALID PLAYER',
  INVALID = 'INVALID PLAYER',
  NOT_READY = 'GAME NOT READY',
  GAME_WON = 'GAME WON',
}

export type GameBoard = ILiteSpace[][];

export type AvatarTotem = {
  id: number;
  name: string;
};

export type Minute = number;

export type GameInstanceID = string;

export type PlayerID = string;

export type GamesInMinute = GameInstanceID[];

export type GamePlayerValidation = {
  gameInstanceID?: GameInstanceID;
  playerID?: string;
};

export type PlayerInTurn = {
  playerInTurn: string;
  playerInTurnID: string;
};

export interface ILoadRegisterData {
  avatarList: AvatarTotem[];
  avatarColorList: typeof Color;
}

export interface IRegisterLoaderAndFilter extends ILoadRegisterData {
  gamePlayerIDs: GamePlayerValidation;
}

export interface IRegisterFormValues {
  playerName: string;
  avatarName: string;
  avatarColor: Color;
}

export interface IPlayersAndBoard {
  gameBoard: ILiteSpace[][] | null;
  activePlayersInGame: IRegisterFormValues[];
  playerInTurn?: string;
  winner?: string;
}

export interface ITestCtxOutput {
  message: string;
}

export interface ILiteSpace {
  Value: string;
  Type: SpaceType;
  AvatarsInSpace: IAvatar[];
  Display: string | number;
}

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
