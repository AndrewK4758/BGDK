import type { SocketListenerTuple } from '@bgdk/socket-io';
import type { Socket } from 'socket.io-client';

const setSocketListeners = (socket: Socket, listenersArr: SocketListenerTuple[]) => {
  listenersArr.forEach(tuple => {
    const [listener, callback] = tuple;
    socket.on(listener, callback);
  });
};

export default setSocketListeners;
