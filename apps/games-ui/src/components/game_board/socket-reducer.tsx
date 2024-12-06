import { IActiveGameInfo } from '../../pages/active_game_session';
import { Socket } from 'socket.io-client';

export enum ActionType {
  BOARD = 'board',
  TAKE_TURN = 'take-turn',
  START = 'start',
  RESET = 'reset',
}

export interface Action {
  type: ActionType;
  payload?: IActiveGameInfo;
  socket?: Socket;
}

const socketReducer = (state: IActiveGameInfo, action: Action) => {
  const { type, socket } = action;
  switch (type) {
    case ActionType.BOARD: {
      const { gameBoard, activePlayersInGame, avatarInTurn, winner } = action.payload as IActiveGameInfo;
      return { ...state, gameBoard, activePlayersInGame, avatarInTurn, winner };
    }
    case ActionType.TAKE_TURN:
      if (socket) socket.emit('action', { action: ActionType.BOARD });
      return { ...state };
    case ActionType.START:
      if (socket) socket.emit('action', { action: ActionType.BOARD });
      return { ...state };
    case ActionType.RESET:
      if (socket) socket.emit('action', { action: ActionType.BOARD });
      return { ...state };
    default:
      throw new Error('Error in reducer');
  }
};

export default socketReducer;
