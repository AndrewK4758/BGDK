import * as http from 'http';
import { Server, ServerOptions } from 'socket.io';
import { SocketEventTuple, SocketMiddleware } from '../types/socket-server.js';
import { ISocketServer } from '../interfaces/socket-server.js';

export class SocketServer implements ISocketServer {
  io: Server;
  constructor(
    httpServer: http.Server,
    serverOptions: Partial<ServerOptions>,
    middleware: SocketMiddleware[],
    listeners: SocketEventTuple[],
  ) {
    this.io = new Server(httpServer, serverOptions);
    middleware.forEach(cb => this.io.use(cb));
    listeners.forEach(tuple => {
      const [event, handler] = tuple;
      this.io.on(event, handler);
    });
  }
}
