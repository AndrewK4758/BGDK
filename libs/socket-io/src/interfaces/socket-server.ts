import { Server } from 'socket.io';
import { socketEvent, socketMiddleware } from '../types/socket-server.js';

export interface ISocketServer {
  io: Server;
  middleware: socketMiddleware[];
  events: socketEvent[];
}
