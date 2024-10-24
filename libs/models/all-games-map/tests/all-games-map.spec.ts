import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Game } from '@bgdk/game';
import { InstanceOfGame } from '@bgdk/instance-of-game';
import { GameInstanceID, Minute } from '@bgdk/types-game';
import { getCurrentMinute } from '@bgdk/utils';
import { AllGamesMap } from '../src/lib/all-games-map';

let activeGame: InstanceOfGame, minute: Minute, gameInstanceID: GameInstanceID, allGamesMap: AllGamesMap;

describe('test AllGamesMapClass', () => {
  beforeAll(() => {
    minute = getCurrentMinute();
    gameInstanceID = 'G@Me!D';
    activeGame = new InstanceOfGame(minute, gameInstanceID, new Game(new ChutesAndLadders(5, 5)));
    allGamesMap = new AllGamesMap();
  });

  it('Should pass', () => {
    allGamesMap.addGame(gameInstanceID, activeGame);

    expect(allGamesMap.AllGames.size).toEqual(1);
    expect(allGamesMap.AllGames.get(gameInstanceID)).toEqual(activeGame);
  });
});
