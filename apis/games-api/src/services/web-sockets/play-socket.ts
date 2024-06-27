import { Socket } from 'socket.io';
import { IPlaySockets } from './interfaces/play-sockets-interfaces';
import { ExtendedError } from 'node_modules/socket.io/dist/namespace';

export class PlaySockets implements IPlaySockets {
  connectionEvent(socket: Socket): void {
    socket.on('connect', () => console.log(`Player ${socket.id} entered game`));
    socket.on('header-check', (data) => {
      console.log(data);
      console.log('HEADERS FROM GAME\n', socket.handshake.headers);
    });
    // socket.emit('new-player', {
    //   playerConnect: `Player ${socket.id} entered game`,
    // });
    console.log('GAME ID: ', socket.handshake.headers['gameid']);
  }

  listenerExecution(
    socket: Socket,
    next: (err?: ExtendedError | undefined) => void
  ): void {
    console.log(`in listener execution`);

    socket.use((data) => {
      console.log('in listener socket');
      console.log('data\n', data);
    });
    return next();
  }

  static Create = () => new PlaySockets();
}
