import { ChutesAndLadders, MAX_SPECIAL_DISTANCE } from '../lib/chutes_and_ladders';
import { Space } from '../lib/space';
import { Die } from '../lib/die';
import { Color, IAvatar, IDie, ISpace, SpaceType, IGame, IPlayer } from '../lib/interfaces';
import { Game } from '../lib/game';
import { Player } from '../lib/player';
import { Avatar } from '../lib/avatar';

let game: IGame,
  cur: ISpace,
  player1: IPlayer,
  player2: IPlayer,
  avatar1: IAvatar,
  avatar2: IAvatar,
  die: IDie,
  rollValue: number,
  instance: ChutesAndLadders;

describe('Test connectivity of spaces within Board', () => {
  beforeAll(() => {
    instance = new ChutesAndLadders(5, 5);
    game = new Game(instance);

    cur = game.instance.startSpace;

    player1 = new Player('Player1', 'player1-id');
    player1.avatar = new Avatar(game.instance.avatarList[0].name, Color.WHITE);

    player2 = new Player('Player2', 'player2-id');
    player2.avatar = new Avatar(game.instance.avatarList[1].name, Color.PINK);

    avatar1 = player1.avatar;
    avatar2 = player2.avatar;

    game.playersArray[0] = player1;
    game.playersArray[1] = player2;

    cur.land(avatar1);
    cur.land(avatar2);

    die = new Die(6);
    rollValue = die.roll();
  });

  afterEach(() => {
    avatar1.location.leave();
    avatar2.location.leave();

    cur = game.instance.startSpace;
  });
  describe('test next property of all spaces', () => {
    it('should pass', () => {
      while (cur) {
        expect(cur).not.toBeNull();
        expect(cur).toBeInstanceOf(Space);
        cur = cur.next;
      }
    });
  });
  describe('Test game startspace has the startspace type', () => {
    it('should pass', () => {
      expect(cur.type).toBe(SpaceType.START);
    });
  });
  describe('Test game previous prop works', () => {
    it('should pass', () => {
      expect(cur.previous).toBeUndefined();
      expect(cur.next.previous).toBeInstanceOf(Space);
    });
  });
  describe('Test startspace is first space in Linked List of spaces', () => {
    it('should pass', () => {
      expect(cur.type).toBe(SpaceType.START);
    });
  });
  describe('Test last space in list is the finish space', () => {
    it('should pass', () => {
      while (cur.next) {
        cur = cur.next;
      }
      expect(cur.type).toBe(SpaceType.FINISH);
    });
  });
  describe('Test special space property on spaces', () => {
    it('should pass', () => {
      while (cur) {
        if (cur.special) {
          expect(cur.special).not.toBeNull();
          expect(cur.special).toBeInstanceOf(Space);
        }
        cur = cur.next;
      }
    });
  });
  describe('Test avatar location property changes after moving avatar', () => {
    it('should pass', () => {
      const oldSpace = cur;

      avatar1.move(rollValue);

      expect(avatar1.location.type === SpaceType.NORMAL).toBeTruthy();
      expect(avatar1.location.occupied).toBeTruthy();
      expect(avatar1.location).not.toEqual(oldSpace);
      expect(avatar2.location).toEqual(oldSpace);
    });
  });
  describe('Test special space distance is less than the max allowed distance of 40 spaces', () => {
    it('should pass', () => {
      while (cur) {
        if (cur.type === SpaceType.CHUTE) {
          let count = 0;
          let testCur = cur;
          const stopValue = cur.special;
          while (testCur !== stopValue) {
            count++;
            testCur = testCur.previous;
          }
          expect(count).toBeLessThanOrEqual(MAX_SPECIAL_DISTANCE);
          count = 0;
        }
        if (cur.type === SpaceType.LADDER) {
          let count = 0;
          let testCur = cur;
          const stopValue = cur.special;
          while (testCur !== stopValue) {
            count++;
            testCur = testCur.next;
          }
          expect(count).toBeLessThanOrEqual(MAX_SPECIAL_DISTANCE);
          count = 0;
        }
        cur = cur.next;
      }
    });
  });
});
