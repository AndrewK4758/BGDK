import { IPlayersAndBoard } from '@bgdk/types-game';

export enum ActionType {
  BOARD = 'board',
  TAKE_TURN = 'take-turn',
}

export interface Action {
  type: ActionType;
  payload: IPlayersAndBoard;
}

const socketReducer = (state: IPlayersAndBoard, action: Action) => {
  const { type } = action;
  const { gameBoard, activePlayersInGame, avatarInTurn, winner } = action.payload;
  switch (type) {
    case ActionType.BOARD:
      return { ...state, gameBoard, activePlayersInGame, avatarInTurn, winner };
    case ActionType.TAKE_TURN:
      return state;
    default:
      return state;
  }
};

export default socketReducer;
