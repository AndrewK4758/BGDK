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
