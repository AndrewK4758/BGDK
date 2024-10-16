import { Socket } from 'socket.io';
import { GameInstanceID, GamePlayerValidation } from '@bgdk/types-game';
import { NextFunction } from 'express';
import { allGamesMap } from '../../middleware/all-games-map.js';

const addGameToSocketInstance = (socket: Socket, next: NextFunction) => {
  if (socket.handshake.headers['current-game']) {
    const gameID = (JSON.parse(socket.handshake.headers['current-game'] as string) as GamePlayerValidation)
      .gameInstanceID as GameInstanceID;

    const game = allGamesMap.AllGames.get(gameID);
    socket.data = game;
    socket.join(gameID);
    next();
  } else socket.emit('no-game-error', { errorMessage: 'No Game Found. Please Register a New Game To Play' });
};

export default addGameToSocketInstance;
