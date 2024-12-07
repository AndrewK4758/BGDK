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
 * This is a reducer function that manages the state of the ActiveGameSession component.
 * It handles actions related to updating the game board, taking turns, starting and resetting the game.
 *
 * @param {IActiveGameInfo} state - The current state of the ActiveGameSession component.
 * @param {Action} action - The action to be performed.
 * @returns {IActiveGameInfo} The updated state.
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
