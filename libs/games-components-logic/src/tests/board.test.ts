import { SpaceType } from '@bgdk/types-game';
import { Board } from '../lib/board';
import { Space } from '../lib/space';

let space: Space;

describe('Test connection of spaces within the boardSetup method', () => {
  beforeEach(() => {
    space = new Board(
      100,
      new Space(SpaceType.START, 'START'),
      () => new Space(SpaceType.NORMAL, 'space'),
    ).boardSetup();
  });

  test('test traversing entire list', () => {
    while (space) {
      expect(space).not.toBeNull();
      expect(space).toBeInstanceOf(Space);
      space = space.next;
    }
  });

  test('test traversing entire list backwards', () => {
    while (space.next) {
      space = space.next;
      expect(space.previous).not.toBeNull();
      expect(space.previous).toBeInstanceOf(Space);
    }
  });
});
