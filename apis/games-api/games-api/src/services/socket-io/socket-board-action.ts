import { InstanceOfGame } from '@bgdk/instance-of-game';
import { Socket } from 'socket.io';
import performAction from '../../controllers/perform_action_context_object';

interface SocketAction {
  action: string;
}

const socketBoardAction = (socket: Socket) => {
  socket.on('action', ({ action }: SocketAction) => {
    const game: InstanceOfGame = socket.data;
    performAction(undefined, undefined, game, action);
  });
};

export default socketBoardAction;
