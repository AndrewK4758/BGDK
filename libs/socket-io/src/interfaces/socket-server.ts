import { Server } from 'socket.io';
import { socketEvent, socketMiddleware } from '../types/socket-server';

export interface ISocketServer {
  io: Server;
  middleware: socketMiddleware[];
  events: socketEvent[];
}
