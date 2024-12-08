import { ClientSocket } from '@bgdk/socket-io-client';
import { createContext, ReactElement, useRef, type JSX, type ReactNode } from 'react';
import type { Socket } from 'socket.io-client';

export type WebSocketContextType = {
  socket: Socket;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const WebSocketContext = createContext<WebSocketContextType>(null!);

interface WebSocketContextProviderProps {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
}

/**
 * This component provides the WebSocket context to its children.
 * The context includes the socket.io socket object.
 *
 * @param {WebSocketContextProviderProps} props - The props for the WebSocketContextProvider component.
 * @param {ReactElement | ReactElement[] | ReactNode | ReactNode[]} props.children - The child components to which the context is provided.
 * @returns {JSX.Element} The rendered WebSocketContextProvider component.
 */

export const WebSocketContextProvider = ({ children }: WebSocketContextProviderProps): JSX.Element => {
  const clientSocket = new ClientSocket(import.meta.env.VITE_WS_SERVER_URL_VERTEX, {
    autoConnect: false,
    reconnectionAttempts: 10,
    reconnectionDelay: 2500,
    withCredentials: false,
    transports: ['polling', 'websocket'],
  });
  const socketRef = useRef<Socket>(clientSocket.clientIo);
  const socket = socketRef.current;

  return <WebSocketContext.Provider value={{ socket: socket }}>{children}</WebSocketContext.Provider>;
};

export default WebSocketContextProvider;
