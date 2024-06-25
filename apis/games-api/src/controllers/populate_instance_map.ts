import { IAllGamesMap } from '@bgdk/all-games-map';
import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Game } from '@bgdk/game';
import { GameInstanceID, GamePlayerValidation, Minute } from '@bgdk/game-types';
import { getCurrentMinute, InstanceOfGame } from '@bgdk/instance-of-game';
import { Request, Response } from 'express';
import ShortUniqueId from 'short-unique-id';
import { IInstanceTimeMap } from '../instance-time-map/instance-time-map';

//NEED TO IMPLEMENT PUTTING THE REF TO THE GAME CLASS IN THE GAME BUILDER AND
//FIND AND CALL THE GAME RATHER THAN THIS HARD CODE OF THE GAME

export const populateInstanceMaps = (req: Request, resp: Response) => {
  const gameName = req.params.id.replace(/-/g, ' ');
  console.log(`Game selected: ${gameName}`);
  const instanceMap = req.app.get('instanceMap') as IInstanceTimeMap;
  const allGamesMap = req.app.get('allGamesMap') as IAllGamesMap;

  const minute: Minute = getCurrentMinute();
  const gameID: GameInstanceID = new ShortUniqueId().rnd();

  const instance = new Game(new ChutesAndLadders(5, 5));

  const activeGame = new InstanceOfGame(minute, gameID, instance);
  allGamesMap.addGame(gameID, activeGame);
  instanceMap.addGameInstance(minute, gameID);

  const __current_game__: GamePlayerValidation = {
    gameInstanceID: gameID,
    playerID: '',
  };
  resp.setHeader('current-game', JSON.stringify(__current_game__));

  resp.sendStatus(201);
};
