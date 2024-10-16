import { IAllGamesMap } from '@bgdk/all-games-map';
import { Chain } from '@bgdk/chain';
import { IBuiltGame } from '@bgdk/game-builder';
import { GameNameString, PlayerID } from '@bgdk/types-game';
import { Request } from 'express';
import { LoginData } from '@bgdk/types-api';
import { IInstanceTimeMap } from '@bgdk/types-api';
import { IInstanceOfGame } from '@bgdk/instance-of-game';

declare global {
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
