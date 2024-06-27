import { Server, Socket } from 'socket.io';
import * as http from 'http';
import { ISocketInstance } from './interfaces/play-sockets-interfaces';
import { CorsOptions } from 'cors';

export class SocketBuilder extends Server {
  private static io: SocketBuilder;

  constructor(httpServer?: http.Server, corsOptions?: CorsOptions) {
    super(httpServer, { cors: corsOptions });
  }

  public setSocketHandlers(socketHandlers: ISocketInstance[]) {
    console.log('active socket handlers\n', socketHandlers);
    socketHandlers.forEach((instance: ISocketInstance) => {
      const namespace = SocketBuilder.io.of(instance.path, (socket: Socket) => {
        instance.handler.connectionEvent(socket);
      });
      if (instance.handler.listenerExecution) {
        namespace.use(instance.handler.listenerExecution);
      }
    });
  }

  public static getSocket = (
    httpServer?: http.Server,
    serverOptions?: CorsOptions
  ): SocketBuilder => {
    if (!SocketBuilder.io) {
      SocketBuilder.io = new SocketBuilder(httpServer, serverOptions);
    }
    return SocketBuilder.io;
  };
}
