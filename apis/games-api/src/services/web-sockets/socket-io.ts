import { Server, Socket } from 'socket.io';
import { corsOptions } from '../../main';
import * as http from 'node:http';

export default class SocketBuilder {
  io: Server;

  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer, { cors: corsOptions });
  }

  listenEvent = async (event: string, callback?: EventListener) => {
    this.io.on('connection', (socket: Socket) => {
      callback
        ? socket.on(event, callback)
        : console.log(`Player: ${socket.id} arrived`);
    });
  };

  emitEvent = async (event: string, data: unknown) => {
    this.io.on('connection', (socket) => {
      socket.emit(event, data);
    });
  };

  emitDisconnectEvent = async () => {
    this.io.on('disconnect', (reason) => this.emitEvent('disconnect', reason));
  };

  static BuildSocket = (http: http.Server) => new SocketBuilder(http);
}
