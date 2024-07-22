import { Space } from '../lib/space';

export interface IBoard {
  TotalSpaces: number;
  StartSpace: Space;
  SpaceMaker: (indexOfSpace: number) => Space;
  boardSetup(): void;
}
