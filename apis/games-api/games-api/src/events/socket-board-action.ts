import type { SocketCallback } from '@bgdk/socket-io';
import { IInstanceOfGame } from '@bgdk/types-game';
import { Socket } from 'socket.io';
import performAction from '../controllers/perform_action_context_object.ts';

interface SocketAction {
  action: string;
}

const socketBoardAction: SocketCallback = (socket: Socket) => {
  socket.on('action', ({ action }: SocketAction) => {
    const game: IInstanceOfGame = socket.data;
    performAction(null, null, game, action);
  });
};

export default socketBoardAction;
