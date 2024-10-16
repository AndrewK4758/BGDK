import { Space } from '../lib/space.js';

export interface IBoard {
  TotalSpaces: number;
  SpaceMaker: (indexOfSpace: number) => Space;
  boardSetup(): void;
}
