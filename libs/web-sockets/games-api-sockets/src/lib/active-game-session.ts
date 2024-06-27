import { SocketBuilder } from './socket-manager';
import { GameBoard } from '@bgdk/game-types';

// figure out how to incorporate this into CoR
// OR
// figure out how to use individual commands in CoR within socket instance

export class Board {
  public static takeTurn(board: GameBoard) {
    // console.log('game board in take turn\n', turn);
    this.updateBoard(board);
  }

  private static updateBoard(board: GameBoard) {
    const io = SocketBuilder.getSocket();
    console.log(`in update board `);
    io.of('/', (socket) => {
      socket.on('header-check', (data) => {
        console.log(data);
        console.log('HEADERS FROM GAME\n', socket.handshake.headers);

        console.log(board);
      });
    });
  }
}
