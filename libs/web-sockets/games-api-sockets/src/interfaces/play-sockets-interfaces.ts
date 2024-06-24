import { Socket } from 'socket.io';
import { ExtendedError } from 'node_modules/socket.io/dist/namespace';
import type { PlaySockets } from '../lib/play-socket';

export interface IPlaySockets {
  connectionEvent(socket: Socket): void;
  listenerExecution?(
    socket?: Socket,
    next?: (err?: ExtendedError | undefined) => void
  ): void;
}

export interface ISocketInstance {
  path: string;
  handler: PlaySockets;
}
