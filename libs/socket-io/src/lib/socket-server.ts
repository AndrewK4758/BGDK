import * as http from 'http';
import { Server, ServerOptions } from 'socket.io';
import { ISocketServer } from '../interfaces/socket-server';
import { SocketMiddleware, type SocketCallback } from '../types/socket-server';

export class SocketServer implements ISocketServer {
  io: Server;
  constructor(
    httpServer: http.Server,
    serverOptions: Partial<ServerOptions>,
    listeners: SocketCallback[],
    middleware?: SocketMiddleware[],
  ) {
    this.io = new Server(httpServer, serverOptions);
    listeners.forEach(listener => {
      this.io.on('connection', listener);
    });

    middleware?.forEach(listener => {
      this.io.use(listener);
    });
  }

  addServerListener = (listener: SocketCallback) => {
    this.io.on('connection', socket => {
      listener(socket);
    });
  };

  addMiddleware = (middleware: SocketMiddleware) => {
    this.io.use(middleware);
  };
}
