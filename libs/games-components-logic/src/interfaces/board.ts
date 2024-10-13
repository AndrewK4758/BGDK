import { Space } from '../lib/space.ts';

export interface IBoard {
  TotalSpaces: number;
  SpaceMaker: (indexOfSpace: number) => Space;
  boardSetup(): void;
}
