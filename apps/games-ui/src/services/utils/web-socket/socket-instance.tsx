import { io, ManagerOptions } from 'socket.io-client';

const managerOptions: Partial<ManagerOptions> = {
  autoConnect: false,
};

const ClientSocket = io(import.meta.env.VITE_WS_SERVER_URL, managerOptions);

export default ClientSocket;
