import { Manager, ManagerOptions } from 'socket.io-client';

/* LOOK INTO CREATING DYNAMIC PATHS TO MIMIC REST URI */

export default class SocketManager {
  #manager: Manager;

  constructor(url: string, managerOptions: Partial<ManagerOptions>) {
    this.#manager = new Manager(url, managerOptions);
  }

  static BuildSocket = (managerOptions: Partial<ManagerOptions>) => {
    const manager = new SocketManager(
      import.meta.env.VITE_WS_SERVER_URL,
      managerOptions
    );
    return manager.#manager;
  };
}
