import { Manager, ManagerOptions } from 'socket.io-client';
import { getGameInstanceInfo } from '../utils';

/* TRIAL FOR SOCKET.IO IMPLEMENTATON */

export default class SocketManager {
  #io: Manager;

  constructor(url: string, managerOptions: Partial<ManagerOptions>) {
    this.#io = new Manager(url, managerOptions);
  }

  static BuildSocket = () =>
    new SocketManager(import.meta.env.VITE_WS_SERVER_URL, {
      autoConnect: false,
      extraHeaders: getGameInstanceInfo(),
    });

  get manager() {
    return this.#io;
  }
}
