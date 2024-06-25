import { IBoard, ISpace } from '@bgdk/game-types';

export class Board implements IBoard {
  TotalSpaces: number;
  SpaceMaker;

  constructor(
    totalSpaces: number,
    spaceMaker: (indexOfSpace: number) => ISpace
  ) {
    this.TotalSpaces = totalSpaces;
    this.SpaceMaker = spaceMaker;
    this.boardSetup();
  }

  boardSetup(): ISpace {
    let space = this.SpaceMaker(this.TotalSpaces);
    for (
      let indexOfSpace = this.TotalSpaces - 1;
      indexOfSpace > 0;
      indexOfSpace--
    ) {
      space.previous = this.SpaceMaker(indexOfSpace);
      space.previous.next = space;
      space = space.previous;
    }
    return space;
  }
}
