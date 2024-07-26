import { GameInstanceID } from '@bgdk/types-game';
import { IInstanceOfGame } from '@bgdk/instance-of-game';

export interface IAllGamesMap {
  AllGames: Map<GameInstanceID, IInstanceOfGame>;
  addGame(gameInstanceID: GameInstanceID, game: IInstanceOfGame): void;
}
