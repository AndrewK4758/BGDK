import { Manager } from 'socket.io-client';
import SocketManager from '../services/utils/web-socket/socket-manager';
import { createContext } from 'react';

export const SocketManagerContext = createContext<Manager>(
  SocketManager.BuildSocket().manager
);
