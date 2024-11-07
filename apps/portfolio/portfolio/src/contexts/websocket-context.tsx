import { createContext, ReactElement, useRef } from 'react';
import ClientSocket from '../utils/web-socket/socket-instance';
import { Socket } from 'socket.io-client';

export type WebsocketContext = {
  socket: Socket;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const WebsocketContext = createContext<WebsocketContext>(null!);

interface WebsocketContextProviderProps {
  children: ReactElement | ReactElement[];
}

const WebsocketContextProvider = ({ children }: WebsocketContextProviderProps) => {
  const clientSocket = new ClientSocket(import.meta.env.VITE_WS_SERVER_URL_VERTEX, { autoConnect: false });
  const socketRef = useRef<Socket>(clientSocket.Socket);
  const socket = socketRef.current;

  return <WebsocketContext.Provider value={{ socket: socket }}>{children}</WebsocketContext.Provider>;
};

export default WebsocketContextProvider;
