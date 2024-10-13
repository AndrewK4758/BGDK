import { IInstanceOfGame } from '@bgdk/instance-of-game';
import { GameInstanceID } from '@bgdk/types-game';
import { IAllGamesMap } from '../interfaces/all-games-map.ts';

export class AllGamesMap implements IAllGamesMap {
  AllGames: Map<GameInstanceID, IInstanceOfGame>;
  constructor() {
    this.AllGames = new Map<GameInstanceID, IInstanceOfGame>();
  }

  addGame(gameInstanceID: GameInstanceID, game: IInstanceOfGame) {
    this.AllGames.set(gameInstanceID, game);
  }
}
