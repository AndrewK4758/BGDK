import { AvatarTotem, Color, GameBoard, IDie, ISpace, SpaceType } from '@bgdk/types-game';
import { Board } from './board';
import { Die } from './die';
import { LiteSpace } from './lite-space';
import { Space } from './space';
import { rangeSelector, rowFinder } from './utils';

const TOTAL_SPACES = 100;
const START = 1;
const ROWS: number = Math.ceil(TOTAL_SPACES / Math.sqrt(TOTAL_SPACES));
const MAX_SPECIAL_DISTANCE = 40;
const uniqueSpecialValues = new Map<number, ISpace>();
const specialsDumps = new Map<number, ISpace>();
let chuteCount = 0;
let ladderCount = 0;
let chuteSpecialCount = 5;
let ladderSpecialCount = 5;

function checkIfSpecialSpace(indexOfSpace: number) {
  return uniqueSpecialValues.has(indexOfSpace);
}

const specialSpaceSelector = (indexOfSpace: number) => {
  const row = rowFinder(indexOfSpace);
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

const createDumpValueChute = (indexOfSpace: number): ISpace => {
  const findMaxValForRand = (indexOfSpace: number): number =>
    indexOfSpace > MAX_SPECIAL_DISTANCE ? MAX_SPECIAL_DISTANCE : indexOfSpace;

  const maxValForRand = findMaxValForRand(indexOfSpace);
  const minDist = (indexOfSpace % ROWS) + 2;
  const distToTraverseChute = rangeSelector(minDist, maxValForRand);
  const dumpValueChute = indexOfSpace - distToTraverseChute;

  if (checkIfSpecialSpace(dumpValueChute) || specialsDumps.has(dumpValueChute)) {
    return createDumpValueChute(indexOfSpace);
  } else {
    const specialSpace = new Space(SpaceType.NORMAL, dumpValueChute) as ISpace;
    specialsDumps.set(dumpValueChute, specialSpace);
    return specialSpace;
  }
};

const createDumpValueLadder = (indexOfSpace: number): ISpace => {
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
    const specialSpace = new Space(SpaceType.NORMAL, dumpValueLadder) as ISpace;
    specialsDumps.set(dumpValueLadder, specialSpace);
    return specialSpace;
  }
};

export { MAX_SPECIAL_DISTANCE, ROWS, START, TOTAL_SPACES, uniqueSpecialValues };

export class ChutesAndLadders {
  CHUTES: number;
  LADDERS: number;
  MAX_PLAYERS: number;
  MIN_PLAYERS: number;
  DIE: IDie;
  startSpace!: ISpace;
  colorList: typeof Color;
  avatarList: AvatarTotem[];

  /**
   *
   * @param {Number} chutes number of chutes
   * @param {Number} ladders number of ladders
   */

  constructor(chutes: number, ladders: number) {
    this.CHUTES = chutes;
    this.LADDERS = ladders;
    this.DIE = new Die(6);
    this.MAX_PLAYERS = 4;
    this.MIN_PLAYERS = 2;
    this.makeGameBoard();
    this.colorList = Color;
    this.avatarList = [
      { id: 1, name: 'XENOMORPH' },
      { id: 2, name: 'PREDATOR' },
      { id: 3, name: 'TERMINATOR' },
      { id: 4, name: 'ROBOCOP' },
    ];
  }

  spaceMaker = (indexOfSpace: number): ISpace => {
    let space: ISpace;
    switch (true) {
      case specialsDumps.has(indexOfSpace):
        space = specialsDumps.get(indexOfSpace) as ISpace;
        return space;

      case uniqueSpecialValues.has(indexOfSpace):
        space = uniqueSpecialValues.get(indexOfSpace) as ISpace;
        return space;

      case indexOfSpace === TOTAL_SPACES:
        space = new Space(SpaceType.FINISH, 'Finish');
        return space;

      case indexOfSpace === START:
        space = new Space(SpaceType.START, 'Start');
        this.startSpace = space;
        return space;

      default:
        space = new Space(SpaceType.NORMAL, indexOfSpace);
        return space;
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

  //firestore db deploy in firebase

  // socket.io will only accept string being sent on event handler, if object, recursion error
  displayGameBoard(): GameBoard {
    const gameBoard: GameBoard = [];
    let space: ISpace = this.startSpace;

    while (space) {
      const display = space.occupied ? space.avatarsInSpace[0].name : space['display'];

      const liteSpace = LiteSpace.MakeSpace(display);

      gameBoard.push(liteSpace);
      space = space.next;
    }
    return gameBoard.reverse();
  }

  specialValuesMaker = (min: number = minSpecialRangeValue(), max: number = TOTAL_SPACES): Map<number, ISpace> => {
    if (uniqueSpecialValues.size < this.CHUTES + this.LADDERS) {
      const specialValue = rangeSelector(min, max);

      if (uniqueSpecialValues.has(specialValue)) this.specialValuesMaker(min, max);
      else {
        const space = specialSpaceSelector(specialValue) as ISpace;

        if (space.type === SpaceType.CHUTE) {
          space.special = createDumpValueChute(specialValue) as ISpace;
          space.special.display = `C ${chuteSpecialCount} END`;
          space.display = `C ${chuteSpecialCount} START`;
          chuteSpecialCount--;
        } else {
          space.special = createDumpValueLadder(specialValue) as ISpace;
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
