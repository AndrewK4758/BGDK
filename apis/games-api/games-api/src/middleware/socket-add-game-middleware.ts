import { Socket } from 'socket.io';
import { GameInstanceID, GamePlayerValidation } from '@bgdk/types-game';
import { allGamesMap } from './all-games-map';
import type { SocketMiddleware, SocketMiddlewareNext } from '@bgdk/types-ai';

const addGameToSocketInstance: SocketMiddleware = (socket: Socket, next: SocketMiddlewareNext) => {
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
