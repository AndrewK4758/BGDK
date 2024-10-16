import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Game } from '@bgdk/game';
import { GameInstanceID, Minute } from '@bgdk/types-game';
import { InstanceOfGame, getCurrentMinute } from '../lib/instance-of-game.js';

let activeGame: InstanceOfGame, minute: Minute, gameInstanceID: GameInstanceID;

describe('test all model functions for games-api and games-ui', () => {
  beforeEach(() => {
    minute = getCurrentMinute();
    gameInstanceID = 'G@Me!D';
    activeGame = new InstanceOfGame(minute, gameInstanceID, new Game(new ChutesAndLadders(5, 5)));
  });

  test('Instance of Game', () => {
    activeGame.updateLastActive(minute);
    expect(activeGame.instance.instance).toBeInstanceOf(ChutesAndLadders);
    expect(activeGame.gameInstanceID).toEqual(gameInstanceID);
    expect(activeGame.instanceTime).toEqual(minute);
    expect(activeGame.lastActive).toEqual(minute);
  });
});
