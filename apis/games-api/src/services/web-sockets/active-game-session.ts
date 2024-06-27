import { SocketBuilder } from './socket-manager';
// import { GameBoard } from '@bgdk/game-types';
// import { activeGameDisplayChain } from '@bgdk/chains-for-games';
// figure out how to incorporate this into CoR
// OR
// figure out how to use individual commands in CoR within socket instance

export class Board {
  public static takeTurn() {
    // console.log('game board in take turn\n', turn);
    this.updateBoard();
  }

  private static updateBoard() {
    const io = SocketBuilder.getSocket();
    console.log(`in update board `);
    io.of('/', (socket) => {
      console.log(socket);
    });
  }
}
