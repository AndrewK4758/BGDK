import { IAllGamesMap } from '../interfaces/all-games-map';
import { IInstanceTimeMap } from '../interfaces/instance-time-map';
import { Chain } from '../interfaces/chain';
import { GameNameString, PlayerID } from './game';
import { IBuiltGame } from '../interfaces/built-game';
import { IInstanceOfGame } from '../interfaces/interfaces';
import { LoginData } from '../types/login-data';

export declare global {
  namespace Express {
    interface Request {
      allGamesMap: IAllGamesMap;
      instanceMap: IInstanceTimeMap;
      gameSpecificChain: Chain | null;
      selectedGameName: GameNameString;
      selectedGame: IBuiltGame | undefined;
      loginData: LoginData;
      activeGameInstance: IInstanceOfGame | null;
      playerID: PlayerID;
    }
  }
}
