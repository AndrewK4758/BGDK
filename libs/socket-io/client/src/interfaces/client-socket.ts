import type { Socket } from 'socket.io-client';

export default interface IClientSocket {
  clientIo: Socket;
}
