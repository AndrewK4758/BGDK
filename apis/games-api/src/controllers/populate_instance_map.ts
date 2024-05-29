import { ChutesAndLadders, Game } from '@aklapper/chutes-and-ladders';
import {
  GameInstanceID,
  GamePlayerValidation,
  getCurrentMinute,
  AllGamesMap,
  InstanceMap,
  InstanceOfGame,
  Minute,
} from '@aklapper/model';
import { Request, Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import { games } from './list-games';

//NEED TO IMPLEMENT PUTTING THE REF TO THE GAME CLASS IN THE GAME BUILDER AND
//FIND AND CALL THE GAME RATHER THAN THIS HARD CODE OF THE GAME

export const populateInstanceMaps = (req: Request, resp: Response) => {
  const gameName = req.params.id.replace(/-/g, ' ');
  console.log(`Game selected: ${gameName}`);
  const instanceMap = req.app.get('instanceMap') as InstanceMap;
  const allGamesMap = req.app.get('allGamesMap') as AllGamesMap;

  const game = games.find(({ name }) => name === gameName);

  const minute: Minute = getCurrentMinute();
  const gameID: GameInstanceID = new ShortUniqueId().rnd();

  game.instance = new Game(new ChutesAndLadders(5, 5));

  const activeGame = new InstanceOfGame(minute, gameID, game.instance);
  allGamesMap.addGame(gameID, activeGame);
  instanceMap.addGameInstance(minute, gameID);

  const __current_game__: GamePlayerValidation = {
    gameInstanceID: gameID,
    playerID: '',
  };
  resp.setHeader('current-game', JSON.stringify(__current_game__));

  resp.sendStatus(201);
};
