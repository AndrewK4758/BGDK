import { SpaceType } from '@bgdk/types-game';
import { Board } from '../src/lib/board';
import { Space } from '../src/lib/space';

let space: Space;

describe('Test connection of spaces within the boardSetup method', () => {
  beforeEach(() => {
    space = new Board(100, () => new Space(SpaceType.NORMAL, 'space')).boardSetup();
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
