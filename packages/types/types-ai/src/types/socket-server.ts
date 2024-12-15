import { ExtendedError, Socket } from 'socket.io';

export type SocketCallback = (socket: Socket) => void;
export type SocketMiddlewareNext = (err?: ExtendedError | undefined) => void;
export type SocketMiddleware = (socket: Socket, next: SocketMiddlewareNext) => void;
export type SocketListenerTuple = [string, (...args: unknown[]) => void];
