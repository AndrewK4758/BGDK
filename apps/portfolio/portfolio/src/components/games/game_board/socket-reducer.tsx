import { Socket } from 'socket.io-client';
import { IActiveGameInfo } from '../../games/active_game_session';

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

/**
 *
 * @param state current state of ActiveGameSession component
 * @param action Action to be executed and websocket to handle execution
 * @returns updated state to ui
 */

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
