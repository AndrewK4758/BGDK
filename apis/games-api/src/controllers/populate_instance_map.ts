import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Game } from '@bgdk/game';
import { GameInstanceID, GamePlayerValidation, Minute } from '@bgdk/types-game';
import { getCurrentMinute, InstanceOfGame } from '@bgdk/instance-of-game';
import { Response } from 'express';
import { IReqObjMaps } from '@bgdk/types-api';
import ShortUniqueId from 'short-unique-id';

//NEED TO IMPLEMENT PUTTING THE REF TO THE GAME CLASS IN THE GAME BUILDER AND
//FIND AND CALL THE GAME RATHER THAN THIS HARD CODE OF THE GAME

const populateInstanceMaps = async (req: IReqObjMaps, resp: Response) => {
  const gameName = req.params.id.replace(/-/g, ' ');
  console.log(`Game selected: ${gameName}`);

  const minute: Minute = getCurrentMinute();
  const gameID: GameInstanceID = new ShortUniqueId().rnd();

  const instance = new Game(new ChutesAndLadders(5, 5));

  const activeGame = new InstanceOfGame(minute, gameID, instance);
  req.allGamesMap.addGame(gameID, activeGame);
  req.instanceMap.addGameInstance(minute, gameID);

  const __current_game__: GamePlayerValidation = {
    gameInstanceID: gameID,
    playerID: '',
  };
  resp.setHeader('current-game', JSON.stringify(__current_game__));

  resp.sendStatus(201);
};

export default populateInstanceMaps;
