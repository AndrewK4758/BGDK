import { io, ManagerOptions, Socket } from 'socket.io-client';

export default class ClientSocket {
  Socket: Socket;
  constructor(managerOptions: Partial<ManagerOptions>) {
    this.Socket = io(import.meta.env.VITE_WS_SERVER_URL, managerOptions);
  }
}
