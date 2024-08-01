import { Game } from '@bgdk/game';
import { getCurrentMinute, InstanceOfGame } from '@bgdk/instance-of-game';
import { IReqObjMaps } from '@bgdk/types-api';
import { GameInstanceID, GamePlayerValidation, Minute } from '@bgdk/types-game';
import { Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import { error } from '../errors/not-a-game-error';

const populateInstanceMaps = async (req: IReqObjMaps, resp: Response): Promise<void> => {
  const gameName = req.selectedGameName;
  console.log(`Game selected: ${gameName}`);

  const selectedGame = req.selectedGame;

  const minute: Minute = getCurrentMinute();
  const gameID: GameInstanceID = new ShortUniqueId().rnd();

  if (!selectedGame) {
    resp.status(400).json(error());
  } else {
    const game = new Game(selectedGame.instance());

    const activeGame = new InstanceOfGame(minute, gameID, game);
    req.allGamesMap.addGame(gameID, activeGame);
    req.instanceMap.addGameInstance(minute, gameID);

    const __current_game__: GamePlayerValidation = {
      gameInstanceID: gameID,
      playerID: '',
    };
    resp.setHeader('current-game', JSON.stringify(__current_game__));

    resp.sendStatus(201);
  }
};

export default populateInstanceMaps;
