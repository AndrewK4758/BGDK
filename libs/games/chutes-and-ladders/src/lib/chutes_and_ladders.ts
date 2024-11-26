import { Board, Die, LiteSpace, Space, rangeSelector, rowFinder } from '@bgdk/games-components-logic';
import { AvatarTotem, Color, SpaceType, type IChutesAndLadders, type ILiteSpace } from '@bgdk/types-game';
import AvatarTotems from './avatar-totems';

export const TOTAL_SPACES = 100;
export const START = 1;
export const ROWS: number = Math.ceil(TOTAL_SPACES / Math.sqrt(TOTAL_SPACES));
export const MAX_SPECIAL_DISTANCE = 40;
export const uniqueSpecialValues = new Map<number, Space>();
export const specialsDumps = new Map<number, Space>();
let chuteCount = 0;
let ladderCount = 0;
let chuteSpecialCount = 5;
let ladderSpecialCount = 5;

/**
 *
 * @param indexOfSpace is the location in the game board array for start of chute or ladder
 * @returns boolean if the index of space is already taken by another chute or ladder space
 */
const checkIfSpecialSpace = (indexOfSpace: number) => {
  return uniqueSpecialValues.has(indexOfSpace);
};

/**
 *
 * @param indexOfSpace is the location in the game board array for end of chute or ladder
 * @returns boolean if the index of space is already taken by another chute or ladder dump space
 */
const checkIfSpecialDumpSpace = (indexOfSpace: number) => {
  return specialsDumps.has(indexOfSpace);
};

/**
 *
 * @param indexOfSpace index of space to be made into a chute or ladders Space instance
 * @returns an instance of chute or ladder Space
 */
const specialSpaceSelector = (indexOfSpace: number) => {
  const row = rowFinder(indexOfSpace, TOTAL_SPACES);
  if (chuteCount === ladderCount || row === ROWS - 1) {
    chuteCount++;
    return new Space(SpaceType.CHUTE, indexOfSpace);
  } else {
    ladderCount++;
    return new Space(SpaceType.LADDER, indexOfSpace);
  }
};

/**
 *
 * @returns the initial minimum number for a perfect square for random special space selection
 */
const minSpecialRangeValue = () => {
  return (ROWS - 1) ** 2 + 1;
};

/**
 *
 * @param indexOfSpace index of space in the game board array
 * @returns the max distance a chute can traverse according to the index of space in the game board array
 */
const findMaxValForRandChute = (indexOfSpace: number): number =>
  indexOfSpace > MAX_SPECIAL_DISTANCE ? MAX_SPECIAL_DISTANCE : indexOfSpace;

/**
 *
 * @param indexOfSpace index of space in the game board array
 * @returns the max distance a ladder can traverse according to the index of space in the game board array
 */
const findMaxValForRandLadder = (indexOfSpace: number): number =>
  TOTAL_SPACES - indexOfSpace > MAX_SPECIAL_DISTANCE ? MAX_SPECIAL_DISTANCE : TOTAL_SPACES - indexOfSpace - 1;

/**
 *
 * @param indexOfSpace index of space in the game board array
 * @returns the minimum distance needed to traverse for specific Chute or Ladder
 */

const findMinDist = (indexOfSpace: number): number => ROWS - (indexOfSpace % ROWS);

/**
 *
 * @param indexOfSpace index of space in the game board array
 * @returns a Normal space for special property of a Chute space
 */

const createDumpValueChute = (indexOfSpace: number): Space => {
  const maxValForRand = findMaxValForRandChute(indexOfSpace);
  const minDist = (indexOfSpace % ROWS) + 1;
  const tempChuteValue = rangeSelector(indexOfSpace - minDist, indexOfSpace - maxValForRand);
  const dumpValueChute = tempChuteValue === 1 ? 2 : tempChuteValue;

  if (checkIfSpecialSpace(dumpValueChute) || checkIfSpecialDumpSpace(dumpValueChute)) {
    return createDumpValueChute(indexOfSpace);
  } else {
    const specialSpace = new Space(SpaceType.NORMAL, dumpValueChute);
    specialsDumps.set(dumpValueChute, specialSpace);
    return specialSpace;
  }
};

/**
 *
 * @param indexOfSpace index of space in the game board array
 * @returns a Normal space for special property of a Ladder space
 */

const createDumpValueLadder = (indexOfSpace: number): Space => {
  const maxValForRand = findMaxValForRandLadder(indexOfSpace);
  const minDist = findMinDist(indexOfSpace);
  const dumpValueLadder = rangeSelector(indexOfSpace + minDist, indexOfSpace + maxValForRand);

  if (checkIfSpecialSpace(dumpValueLadder) || checkIfSpecialDumpSpace(dumpValueLadder)) {
    return createDumpValueLadder(indexOfSpace);
  } else {
    const specialSpace = new Space(SpaceType.NORMAL, dumpValueLadder);
    specialsDumps.set(dumpValueLadder, specialSpace);
    return specialSpace;
  }
};

export class ChutesAndLadders implements IChutesAndLadders {
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
   * @returns Active instance of Chutes And Ladders Game
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

  /**
   *
   * @param indexOfSpace index of space in the game board array
   * @returns the cooresponding space type according to the index number
   */
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

  /**
   *
   * @param name Avatar name
   * @returns the cooresponding svg image associated with the name of the selected Avatar
   */
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

  /**
   *
   * @returns a complete game board array of LiteSpace instances
   */
  displayGameBoard(): ILiteSpace[] {
    const gameBoard: ILiteSpace[] = [];
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

  /**
   *
   * @param min Minimum number in the range used to select special space indexes
   * @param max Maximum number in the range used to select special space indexes
   * @returns A map containing the index of each special Space with the Space instance that coorespondes
   */
  specialValuesMaker = (min: number = minSpecialRangeValue(), max: number = TOTAL_SPACES): Map<number, Space> => {
    if (uniqueSpecialValues.size < this.CHUTES + this.LADDERS) {
      const value = rangeSelector(min, max);
      const specialValue = value === 1 ? 2 : value;

      if (uniqueSpecialValues.has(specialValue) || specialsDumps.has(specialValue)) this.specialValuesMaker(min, max);
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
