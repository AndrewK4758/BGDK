import type { Socket } from 'socket.io';
import type { NextFunction } from 'express';

export type socketEvent = [string, (...args: unknown[]) => void];
export type socketMiddleware = (socket: Socket, next: NextFunction) => void;
