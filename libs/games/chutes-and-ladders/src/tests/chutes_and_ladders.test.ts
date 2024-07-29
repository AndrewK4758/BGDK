import { SpaceType } from '@bgdk/types-game';
import { GameBoard, rangeSelector } from '@bgdk/games-components-logic';
import {
  ChutesAndLadders,
  MAX_SPECIAL_DISTANCE,
  START,
  TOTAL_SPACES,
  uniqueSpecialValues,
} from '../lib/chutes_and_ladders.js';
import { Space } from '@bgdk/games-components-logic';

let game: ChutesAndLadders, gameBoard: GameBoard;

beforeAll(() => {
  game = new ChutesAndLadders(5, 5);
  gameBoard = game.displayGameBoard();
});

describe('Test connectivity of spaces within Board', () => {
  it('should test min, max players and max special distance', () => {
    expect(game.MIN_PLAYERS).toEqual(2);
    expect(game.MAX_PLAYERS).toEqual(4);
    expect(START).toEqual(1);
    expect(TOTAL_SPACES).toEqual(100);
    expect(MAX_SPECIAL_DISTANCE).toEqual(40);
    expect(game.CHUTES).toEqual(5);
    expect(game.LADDERS).toEqual(5);
    expect(game.DIE.sides).toEqual(6);
  });
  it('should be the first space in the gameboard', () => {
    expect(game.startSpace).not.toBeNull();
    expect(game.startSpace).toBeInstanceOf(Space);
    expect(game.startSpace.type).toEqual(SpaceType.START);
  });

  it('should have a length of 4', () => {
    expect(game.avatarList.length).toEqual(4);
  });

  it('should return a normal space', () => {
    const value = rangeSelector(2, 99);
    const space = uniqueSpecialValues.has(value) ? game.spaceMaker(rangeSelector(2, 99)) : game.spaceMaker(value);
    expect(space.type).toEqual(SpaceType.NORMAL);
  });
  it('should return the finish space', () => {
    const space = game.spaceMaker(TOTAL_SPACES);
    expect(space.type).toEqual(SpaceType.FINISH);
  });
  it('should return a chute space', () => {
    const indexOfSpace = Array.from(uniqueSpecialValues.keys())[0];

    const space = game.spaceMaker(indexOfSpace);
    expect(space.type).toEqual(SpaceType.CHUTE);
  });
  it('should return a ladder space', () => {
    const indexOfSpace = Array.from(uniqueSpecialValues.keys())[uniqueSpecialValues.size - 1];

    const space = game.spaceMaker(indexOfSpace);
    expect(space.type).toEqual(SpaceType.LADDER);
  });

  it(`will return a array of length ${TOTAL_SPACES}`, () => {
    expect(gameBoard.length).toEqual(TOTAL_SPACES);
  });
});
