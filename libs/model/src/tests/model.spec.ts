import { ChutesAndLadders } from '@aklapper/chutes-and-ladders';
import { Game } from '@aklapper/game';
import {
  GameBuilder,
  GameInstanceID,
  getCurrentMinute,
  InstanceMap,
  InstanceOfGame,
  Minute,
  Rule,
} from '../lib/model';

let rb: Rule,
  gb: GameBuilder,
  instanceMap: InstanceMap,
  activeGame: InstanceOfGame,
  minute: Minute,
  gameInstanceID: GameInstanceID;

describe('test all model functions for games-api and games-ui', () => {
  beforeEach(() => {
    minute = getCurrentMinute();
    gameInstanceID = 'G@Me!D';
    rb = new Rule();
    gb = new GameBuilder();
    instanceMap = new InstanceMap();
    activeGame = new InstanceOfGame(
      minute,
      gameInstanceID,
      new Game(new ChutesAndLadders(5, 5))
    );
  });

  test('RuleBuilder', () => {
    const r1 = rb
      .setOrder(1)
      .setTitle('Rule 1')
      .setValue('Rule 1 explains rule 1')
      .build();
    expect(r1.order).toEqual(1);
    expect(r1.title).toEqual('Rule 1');
    expect(r1.value).toEqual('Rule 1 explains rule 1');
  });

  test('Game Builder', () => {
    const game = gb
      .seId('1')
      .setName('game 1')
      .setDescription('description of game 1')
      .setImageURL('http://imageOfGame1.com')
      .setRule(1, 'rule title', 'rule value')
      .setGameFunctionality([])
      .build();

    expect(game.name).toEqual('game 1');
    expect(game.id).toEqual('1');
    expect(game.description).toEqual('description of game 1');
    expect(game.imageURL).toEqual('http://imageOfGame1.com');
    expect(game.rules[0].title).toEqual('rule title');
    expect(game.rules[0].order).toEqual(1);
    expect(game.rules[0].value).toEqual('rule value');
  });

  test('Instance Map', () => {
    instanceMap.addGameInstance(minute, gameInstanceID);

    expect(instanceMap.Map.size).toEqual(1441); //minutes in a day plus one to hold values for 24 hours
    expect(instanceMap.Map.get(minute)).toEqual([gameInstanceID]);
  });

  test('Instance of Game', () => {
    activeGame.updateLastActive(minute);
    expect(activeGame.instance.instance).toBeInstanceOf(ChutesAndLadders);
    expect(activeGame.gameInstanceID).toEqual(gameInstanceID);
    expect(activeGame.instanceTime).toEqual(minute);
    expect(activeGame.lastActive).toEqual(minute);
  });
});
