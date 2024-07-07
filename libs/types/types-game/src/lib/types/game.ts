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
  IO = 'IO',
}

export enum TurnStatus {
  VALID = 'VALID PLAYER',
  INVALID = 'INVALID PLAYER',
  NOT_READY = 'GAME NOT READY',
  GAME_WON = 'GAME WON',
}

export type GameBoard = string[];

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
  activePlayersInGame: IRegisterFormValues[];
  gameBoard: GameBoard;
  avatarInTurn?: string;
  winner?: string;
}

export interface ITestCtxOutput {
  message: string;
}
