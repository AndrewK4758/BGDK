import { Board, Space, LiteSpace } from '@bgdk/games-components-logic';
import { SpaceType, Color, AvatarTotem } from '@bgdk/types-game';
import AvatarTotems from './avatar-totems';

export const WINNING_POSITIONS: string[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
];
export const TOTAL_SPACES = 9;
export const ROWS = Math.sqrt(TOTAL_SPACES);

export class TicTacToe {
  MIN_PLAYERS: number;
  MAX_PLAYERS: number;
  startSpace: Space;
  avatarList: AvatarTotem[];
  colorList: typeof Color;

  constructor() {
    this.MIN_PLAYERS = 2;
    this.MAX_PLAYERS = 2;
    this.startSpace = new Space(SpaceType.NORMAL, 1);
    this.makeGameBoard();
    this.colorList = Color;
    this.avatarList = AvatarTotems.totemsList;
  }

  makeGameBoard = () => {
    new Board(TOTAL_SPACES, this.spaceMaker);
  };

  spaceMaker = (indexOfSpace: number) =>
    indexOfSpace === 1 ? this.startSpace : new Space(SpaceType.NORMAL, indexOfSpace);

  addAvatarSvgToDisplay = (name: string) => {
    switch (name) {
      case AvatarTotems.totemsList[0].name:
        return AvatarTotems.totemsList[0].image;
      case AvatarTotems.totemsList[1].name:
        return AvatarTotems.totemsList[1].image;
      default:
        throw Error('Avatar not in list');
    }
  };

  displayGameBoard = () => {
    const board: LiteSpace[] = [];
    let space = this.startSpace;
    let display;

    while (space) {
      if (space.occupied) {
        display = this.addAvatarSvgToDisplay(space.avatarsInSpace[0].name);
      } else {
        display = space['display'];
      }
      const liteSpace = LiteSpace.MakeSpace(display);

      board.push(liteSpace);
      space = space.next;
    }
    return board;
  };
}
