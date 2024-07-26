import { Space } from '../lib/space';

export interface IBoard {
  TotalSpaces: number;
  SpaceMaker: (indexOfSpace: number) => Space;
  boardSetup(): void;
}
