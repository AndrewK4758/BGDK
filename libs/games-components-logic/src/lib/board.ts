import { IBoard } from '../interfaces/board';
import { Space } from './space';

export class Board implements IBoard {
  TotalSpaces: number;
  StartSpace: Space;
  SpaceMaker: (indexOfSpace: number) => Space;

  constructor(totalSpaces: number, startSpace: Space, spaceMaker: (indexOfSpace: number) => Space) {
    this.TotalSpaces = totalSpaces;
    this.StartSpace = startSpace;
    this.SpaceMaker = spaceMaker;
    this.boardSetup();
  }

  boardSetup() {
    let space = this.SpaceMaker(this.TotalSpaces);
    for (let indexOfSpace = this.TotalSpaces - 1; indexOfSpace > 1; indexOfSpace--) {
      space.previous = this.SpaceMaker(indexOfSpace);
      space.previous.next = space;
      space = space.previous;
    }
    space.previous = this.StartSpace;
    space.previous.next = space;
    space = space.previous;

    return space;
  }
}
