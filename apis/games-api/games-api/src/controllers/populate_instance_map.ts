import { Game } from '@bgdk/game';
import { InstanceOfGame } from '@bgdk/instance-of-game';
import {
  AllGameTypes,
  GameInstanceID,
  GamePlayerValidation,
  getCurrentMinute,
  IBuiltGame,
  Minute,
} from '@bgdk/types-game';
import { Response, type Request } from 'express';
import ShortUniqueId from 'short-unique-id';
import updateInstanceTimeMap from '../services/prisma/instance-time-map/update-instance-time-map.ts';
import updateUserActiveGames from '../services/prisma/users/update-user-active-games.ts';

//Make a filter to parse the current game header and add to the request object

const populateInstanceMaps = async (req: Request, resp: Response): Promise<void> => {
  const selectedGame = req.selectedGame;
  const minute: Minute = getCurrentMinute();

  const gameID: GameInstanceID = new ShortUniqueId().rnd();

  const game = new Game((selectedGame as IBuiltGame).instance() as AllGameTypes);

  const activeGame = new InstanceOfGame(minute, gameID, game);
  req.allGamesMap.addGame(gameID, activeGame);
  req.instanceMap.addGameInstance(minute, gameID);

  await updateInstanceTimeMap(minute, gameID);
  if (req.playerID) {
    await updateUserActiveGames(req.playerID, gameID);
  }

  const __current_game__: GamePlayerValidation = req.header('current-game')
    ? JSON.parse(req.header('current-game') as string)
    : ({ gameInstanceID: gameID, playerID: '' } as GamePlayerValidation);

  __current_game__.gameInstanceID = gameID;

  resp.setHeader('current-game', JSON.stringify(__current_game__));

  resp.sendStatus(201);
};

export default populateInstanceMaps;
