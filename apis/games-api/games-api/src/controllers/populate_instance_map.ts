import { Game } from '@bgdk/game';
import { getCurrentMinute, InstanceOfGame } from '@bgdk/instance-of-game';
import { IReqObjMaps } from '@bgdk/types-api';
import { GameInstanceID, GamePlayerValidation, Minute } from '@bgdk/types-game';
import { Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import games from '../data/games-list';
import { error } from '../errors/error';

//NEED TO IMPLEMENT PUTTING THE REF TO THE GAME CLASS IN THE GAME BUILDER AND
//FIND AND CALL THE GAME RATHER THAN THIS HARD CODE OF THE GAME

const populateInstanceMaps = async (req: IReqObjMaps, resp: Response): Promise<void> => {
  const gameName = req.params['id'].replace(/-/g, ' ');
  console.log(`Game selected: ${gameName}`);

  const minute: Minute = getCurrentMinute();
  const gameID: GameInstanceID = new ShortUniqueId().rnd();

  const selectedGame = games.find(({ name }) => name === gameName);

  if (!selectedGame) {
    console.log(resp.header('current-game'));
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

    console.log(resp.header('current-game'));
    resp.sendStatus(201);
  }
};

export default populateInstanceMaps;
  