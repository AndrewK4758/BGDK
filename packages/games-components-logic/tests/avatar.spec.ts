import { Color, SpaceType } from '@bgdk/types-game';
import { Avatar } from '../src/lib/avatar';
import { Space } from '../src/lib/space';

let avatar: Avatar, space: Space, nextSpace: Space;

describe('Test Avatar props and methods', () => {
  beforeAll(() => {
    avatar = new Avatar('AVATAR NAME', Color.BLACK);
    space = new Space(SpaceType.NORMAL, '1');
    nextSpace = new Space(SpaceType.NORMAL, '2');
    space.next = nextSpace;
  });

  it('Should pass and return avatar name and color', () => {
    expect(avatar.name).toEqual('AVATAR NAME');
    expect(avatar.color).toEqual(Color.BLACK);
  });

  it('Should pass and return the avatar location', () => {
    avatar.location = space;

    expect(avatar.location).toBeTruthy();
  });

  it('Should pass and move avatar forward ', () => {
    avatar.move(1);

    expect(avatar.location).toEqual(nextSpace);
  });
  it('Should pass and move avatar backward', () => {
    avatar.move(-1);

    expect(avatar.location).toEqual(nextSpace);
  });
});
