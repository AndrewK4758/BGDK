import * as http from 'http';
import { Server, ServerOptions } from 'socket.io';
import { socketEvent, socketMiddleware } from '../types/socket-server';
import { ISocketServer } from '../interfaces/socket-server';

export class SocketServer implements ISocketServer {
  events: socketEvent[];
  middleware: socketMiddleware[];
  io: Server;
  constructor(
    httpServer: http.Server,
    serverOptions: Partial<ServerOptions>,
    middleware: socketMiddleware[],
    listeners: socketEvent[],
  ) {
    this.io = new Server(httpServer, serverOptions);
    this.middleware = [];
    this.events = [];
    middleware.forEach(cb => {
      this.io.use(cb);
    });
    listeners.forEach(tuple => {
      const [event, handler] = tuple;
      this.io.on(event, handler);
    });
  }
}
