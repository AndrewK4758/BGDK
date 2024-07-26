import { AvatarTotem, Color, SpaceType } from '@bgdk/types-game';
import AvatarTotems from './avatar-totems';
import { Board, Die, Space, rangeSelector, rowFinder, LiteSpace, GameBoard } from '@bgdk/games-components-logic';

const TOTAL_SPACES = 100;
const START = 1;
const ROWS: number = Math.ceil(TOTAL_SPACES / Math.sqrt(TOTAL_SPACES));
const MAX_SPECIAL_DISTANCE = 40;
const uniqueSpecialValues = new Map<number, Space>();
const specialsDumps = new Map<number, Space>();
let chuteCount = 0;
let ladderCount = 0;
let chuteSpecialCount = 5;
let ladderSpecialCount = 5;

function checkIfSpecialSpace(indexOfSpace: number) {
  return uniqueSpecialValues.has(indexOfSpace);
}

const specialSpaceSelector = (indexOfSpace: number) => {
  const row = rowFinder(indexOfSpace, TOTAL_SPACES);
  if (chuteCount === ladderCount || row === ROWS - 1) {
    const space = new Space(SpaceType.CHUTE, indexOfSpace);
    chuteCount++;
    return space;
  } else {
    const space = new Space(SpaceType.LADDER, indexOfSpace);
    ladderCount++;
    return space;
  }
};

const minSpecialRangeValue = () => {
  return (ROWS - 1) ** 2 + 1;
};

const createDumpValueChute = (indexOfSpace: number): Space => {
  const findMaxValForRand = (indexOfSpace: number): number =>
    indexOfSpace > MAX_SPECIAL_DISTANCE ? MAX_SPECIAL_DISTANCE : indexOfSpace;

  const maxValForRand = findMaxValForRand(indexOfSpace);
  const minDist = (indexOfSpace % ROWS) + 2;
  const distToTraverseChute = rangeSelector(minDist, maxValForRand);
  const dumpValueChute = indexOfSpace - distToTraverseChute;

  if (checkIfSpecialSpace(dumpValueChute) || specialsDumps.has(dumpValueChute)) {
    return createDumpValueChute(indexOfSpace);
  } else {
    const specialSpace = new Space(SpaceType.NORMAL, dumpValueChute) as Space;
    specialsDumps.set(dumpValueChute, specialSpace);
    return specialSpace;
  }
};

const createDumpValueLadder = (indexOfSpace: number): Space => {
  const findMinDist = (indexOfSpace: number): number =>
    ROWS - (indexOfSpace % ROWS) === 0 ? ROWS - (indexOfSpace % ROWS) + 1 : ROWS - (indexOfSpace % ROWS);

  const findMaxValForRand = (indexOfSpace: number): number =>
    TOTAL_SPACES - indexOfSpace > MAX_SPECIAL_DISTANCE ? MAX_SPECIAL_DISTANCE : TOTAL_SPACES - indexOfSpace;

  const maxValForRand = findMaxValForRand(indexOfSpace);
  const minDist = findMinDist(indexOfSpace);
  const distToTraverseLadder = rangeSelector(minDist, maxValForRand);
  const dumpValueLadder = indexOfSpace + distToTraverseLadder;

  if (checkIfSpecialSpace(dumpValueLadder) || specialsDumps.has(dumpValueLadder)) {
    return createDumpValueLadder(indexOfSpace);
  } else {
    const specialSpace = new Space(SpaceType.NORMAL, dumpValueLadder) as Space;
    specialsDumps.set(dumpValueLadder, specialSpace);
    return specialSpace;
  }
};

export { MAX_SPECIAL_DISTANCE, ROWS, START, TOTAL_SPACES, uniqueSpecialValues };

export class ChutesAndLadders {
  MAX_PLAYERS: number;
  MIN_PLAYERS: number;
  CHUTES: number;
  LADDERS: number;
  DIE: Die;
  startSpace: Space;
  colorList: typeof Color;
  avatarList: AvatarTotem[];
  /**
   *
   * @param {Number} chutes number of chutes
   * @param {Number} ladders number of ladders
   */
  constructor(chutes: number, ladders: number) {
    this.MIN_PLAYERS = 2;
    this.MAX_PLAYERS = 4;
    this.CHUTES = chutes;
    this.LADDERS = ladders;
    this.startSpace = new Space(SpaceType.START, 'START');
    this.makeGameBoard();
    this.colorList = Color;
    this.avatarList = AvatarTotems.totemsList;
    this.DIE = new Die(6);
  }

  spaceMaker = (indexOfSpace: number): Space => {
    switch (true) {
      case specialsDumps.has(indexOfSpace):
        return specialsDumps.get(indexOfSpace) as Space;

      case uniqueSpecialValues.has(indexOfSpace):
        return uniqueSpecialValues.get(indexOfSpace) as Space;

      case indexOfSpace === TOTAL_SPACES:
        return new Space(SpaceType.FINISH, 'Finish');

      case indexOfSpace === START:
        return this.startSpace;

      default:
        return new Space(SpaceType.NORMAL, indexOfSpace);
    }
  };

  makeGameBoard = () => {
    uniqueSpecialValues.clear();
    specialsDumps.clear();
    this.specialValuesMaker();
    new Board(TOTAL_SPACES, this.spaceMaker);
    chuteCount = 0;
    ladderCount = 0;
    chuteSpecialCount = 5;
    ladderSpecialCount = 5;
  };

  addAvatarSvgToDisplay = (name: string) => {
    switch (name) {
      case AvatarTotems.totemsList[0].name:
        return AvatarTotems.totemsList[0].image;
      case AvatarTotems.totemsList[1].name:
        return AvatarTotems.totemsList[1].image;
      case AvatarTotems.totemsList[2].name:
        return AvatarTotems.totemsList[2].image;
      case AvatarTotems.totemsList[3].name:
        return AvatarTotems.totemsList[3].image;
      default:
        throw Error('Avatar not in list');
    }
  };
  //firestore db deploy in firebase

  // socket.io will only accept string being sent on event handler, if object, recursion error
  displayGameBoard(): GameBoard {
    const gameBoard: GameBoard = [];
    let space: Space = this.startSpace;
    let display;
    while (space) {
      if (space.occupied) {
        display = this.addAvatarSvgToDisplay(space.avatarsInSpace[0].name);
      } else {
        display = space['display'];
      }
      const liteSpace = LiteSpace.MakeSpace(display);

      gameBoard.push(liteSpace);
      space = space.next;
    }
    return gameBoard.reverse();
  }

  specialValuesMaker = (min: number = minSpecialRangeValue(), max: number = TOTAL_SPACES): Map<number, Space> => {
    if (uniqueSpecialValues.size < this.CHUTES + this.LADDERS) {
      const specialValue = rangeSelector(min, max);

      if (uniqueSpecialValues.has(specialValue)) this.specialValuesMaker(min, max);
      else {
        const space = specialSpaceSelector(specialValue) as Space;

        if (space.type === SpaceType.CHUTE) {
          space.special = createDumpValueChute(specialValue) as Space;
          space.special.display = `C ${chuteSpecialCount} END`;
          space.display = `C ${chuteSpecialCount} START`;
          chuteSpecialCount--;
        } else {
          space.special = createDumpValueLadder(specialValue) as Space;
          space.special.display = `L ${ladderSpecialCount} END`;
          space.display = `L ${ladderSpecialCount} START`;
          ladderSpecialCount--;
        }

        uniqueSpecialValues.set(specialValue, space);
        this.specialValuesMaker(min - (ROWS - 1), max - (ROWS - 1));
      }
    }
    return uniqueSpecialValues;
  };
}
