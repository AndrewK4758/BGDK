import { Minute, GamesInMinute, GameInstanceID } from '../types/game';
export interface IInstanceTimeMap {
    Map: Map<Minute, GamesInMinute>;
    addGameInstance(minute: Minute, gameInstanceID: GameInstanceID): void;
}
//# sourceMappingURL=instance-time-map.d.ts.map