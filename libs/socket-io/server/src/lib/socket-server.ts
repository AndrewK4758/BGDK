import type { Server as httpServer } from 'http';
import { Server, ServerOptions } from 'socket.io';
import type { ISocketServer } from '../interfaces/socket-server';
import { type SocketMiddleware, type SocketCallback } from '@bgdk/types-ai';

export class SocketServer implements ISocketServer {
  io: Server;
  constructor(
    httpServer: httpServer,
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
