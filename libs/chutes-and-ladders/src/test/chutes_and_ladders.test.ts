import {
  MAX_SPECIAL_DISTANCE,
  TOTAL_SPACES,
  START,
  ROWS,
  uniqueSpecialValues,
  ChutesAndLadders,
} from '../lib/chutes_and_ladders.js';
import { GameBoard, SpaceType } from '@bgdk/game-types';
import { Space } from '../lib/space';

let game: ChutesAndLadders;

describe('Test connectivity of spaces within Board', () => {
  beforeAll(() => {
    game = new ChutesAndLadders(5, 5);
  });

  describe('test constants in chutes and ladders instance', () => {
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
  });
  describe('test startspace property', () => {
    it('should be the first space in the gameboard', () => {
      expect(game.startSpace).not.toBeNull();
      expect(game.startSpace).toBeInstanceOf(Space);
      expect(game.startSpace.type).toEqual(SpaceType.START);
    });
  });
  describe('Test avatar list prop', () => {
    it('should have a length of 4', () => {
      expect(game.avatarList.length).toEqual(4);
    });
  });
  describe('Test space maker method', () => {
    it('should return a normal space', () => {
      const space = game.spaceMaker(2);
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
      const indexOfSpace = Array.from(uniqueSpecialValues.keys())[3];

      const space = game.spaceMaker(indexOfSpace);
      expect(space.type).toEqual(SpaceType.LADDER);
    });
  });
  describe('test display game board method', () => {
    it('will return a 2D array of length 10', () => {
      const gameBoard: GameBoard = game.displayGameBoard();

      expect(gameBoard.length).toEqual(ROWS);
      expect(gameBoard[0].length).toEqual(ROWS);
    });
  });
});
