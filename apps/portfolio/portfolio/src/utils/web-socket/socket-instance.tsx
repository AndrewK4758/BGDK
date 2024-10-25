import { io, ManagerOptions, Socket } from 'socket.io-client';

export default class ClientSocket {
  Socket: Socket;
  constructor(url: string, managerOptions: Partial<ManagerOptions>) {
    this.Socket = io(url, managerOptions);
  }
}
