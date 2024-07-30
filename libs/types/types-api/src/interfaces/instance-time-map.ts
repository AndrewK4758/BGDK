import { GameInstanceID, GamesInMinute, Minute } from '@bgdk/types-game';

export interface IInstanceTimeMap {
  Map: Map<Minute, GamesInMinute>;
  addGameInstance(minute: Minute, gameInstanceID: GameInstanceID): void;
}
