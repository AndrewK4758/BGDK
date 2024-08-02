import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { GameBuilder } from '../lib/game-builder';

let gb: GameBuilder;

describe('Test Game Builder', () => {
  beforeAll(() => {
    gb = new GameBuilder();
  });

  it('Should build a game and pass', () => {
    const game = gb
      .setId('1')
      .setName('game 1')
      .setDescription('description of game 1')
      .setImageURL('http://imageOfGame1.com')
      .setRule(1, 'rule title', 'rule value')
      .setGameFunctionality([], true)
      .setInstance(() => new ChutesAndLadders(5, 5))
      .build();

    expect(game.name).toEqual('game 1');
    expect(game.id).toEqual('1');
    expect(game.description).toEqual('description of game 1');
    expect(game.imageURL).toEqual('http://imageOfGame1.com');
    expect(game.rules[0].title).toEqual('rule title');
    expect(game.rules[0].order).toEqual(1);
    expect(game.rules[0].value).toEqual('rule value');
    expect(game.instance()).toBeInstanceOf(ChutesAndLadders);
    expect(game.chain).toBeTruthy();
  });
});
