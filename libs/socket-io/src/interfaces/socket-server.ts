import { Server } from 'socket.io';
import { socketEvent, socketMiddleware } from '../types/socket-server.ts';

export interface ISocketServer {
  io: Server;
  middleware: socketMiddleware[];
  events: socketEvent[];
}
