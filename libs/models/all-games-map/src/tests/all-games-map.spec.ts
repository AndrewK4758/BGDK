import { AllGamesMap } from '../lib/all-games-map';
import { ChutesAndLadders } from '@aklapper/chutes-and-ladders';
import { InstanceOfGame, getCurrentMinute } from '@aklapper/instance-of-game';
import { Game } from '@aklapper/game';
import { Minute, GameInstanceID } from '@aklapper/game-types';

let activeGame: InstanceOfGame,
  minute: Minute,
  gameInstanceID: GameInstanceID,
  allGamesMap: AllGamesMap;

describe('test AllGamesMapClass', () => {
  beforeAll(() => {
    minute = getCurrentMinute();
    gameInstanceID = 'G@Me!D';
    activeGame = new InstanceOfGame(
      minute,
      gameInstanceID,
      new Game(new ChutesAndLadders(5, 5))
    );
    allGamesMap = new AllGamesMap();
  });

  it('Should pass', () => {
    allGamesMap.addGame(gameInstanceID, activeGame);

    expect(allGamesMap.AllGames.size).toEqual(1);
    expect(allGamesMap.AllGames.get(gameInstanceID)).toEqual(activeGame);
  });
});
