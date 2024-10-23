import { Player } from '../src/lib/player';
import { Avatar } from '../src/lib/avatar';
import { Color } from '@bgdk/types-game';

let player: Player, avatar: Avatar, pName: string, aName: string, id: string;

describe('Test Player', () => {
  beforeAll(() => {
    pName = 'P-NAME';
    aName = 'A-NAME';
    id = 'id';
    player = new Player(pName, id);
    avatar = new Avatar(aName, Color.BLACK);
    player.order = 1;
    player.avatar = avatar;
  });

  it('Should pass and return app properties of a player', () => {
    expect(player.name).toEqual(pName);
    expect(player.id).toEqual(id);
    expect(player.order).toEqual(1);
    expect(player.avatar).toEqual(avatar);
  });
});
