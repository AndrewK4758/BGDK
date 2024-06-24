import { SocketBuilder } from './socket-manager';
import { GameBoard } from '@bgdk/game-types';

// figure out how to incorporate this into CoR
// OR
// figure out how to use individual commands in CoR within socket instance

export class TakeTurn {
  public static takeTurn(turn: GameBoard) {
    console.log('game board in take turn\n', turn);
    this.updateBoard(turn);
  }

  private static updateBoard(turn: GameBoard) {
    const io = SocketBuilder.getSocket();
    console.log(`in update board `);
    io.of('/games/Chutes-&-Ladders/play', (socket) => {
      socket.emit('board-load-return', turn);
    });
  }
}
