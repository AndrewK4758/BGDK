import { Server, Socket } from 'socket.io';
import * as http from 'http';
import { corsOptions } from '../../main';
import { GameInstanceID } from '@bgdk/types-game';
import { getActiveGameWS } from '@bgdk/de-referencing-utilities';
import { allGamesMap } from '../../middleware/all-games-map';
import { InstanceOfGame } from '@bgdk/instance-of-game';
import performAction from '../../controllers/perform_action_context_object';

interface SocketAction {
  action: string;
}

export default class SocketServer {
  static instance: SocketServer;
  io: Server;
  constructor(httpServer: http.Server) {
    SocketServer.instance = this;
    this.io = new Server(httpServer, {
      cleanupEmptyChildNamespaces: true,
      cors: corsOptions,
    });

    this.io.on('connection', this.EnterRoomAndListen);
  }

  EnterRoomAndListen = (socket: Socket) => {
    socket.on('create-room', gameInstanceID => {
      const room = gameInstanceID as GameInstanceID;
      console.log(`In room: ${room}`);
      socket.join(room);
      const game = getActiveGameWS(room, allGamesMap);
      socket.data = game;
    });

    socket.on('action', ({ action }: SocketAction) => {
      const game: InstanceOfGame = socket.data;
      performAction(undefined, undefined, game, action);
    });
  };
}
