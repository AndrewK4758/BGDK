import { ChainBuilder } from '@bgdk/chain';
import { boardStart } from '../commands/action-board/board-start';
import { readyToPlayCheck } from '../commands/action-board/ready-to-play';
import { checkIfWinner } from '../commands/action-board/check-if-winner';
import { activeDataToSend } from '../commands/action-board/active-game-data-to-send';
import { IActivePlayersInGame } from '@bgdk/types-game';
import { GameBoard } from '@bgdk/games-components-logic';

export interface IPlayersAndBoard extends IActivePlayersInGame {
  gameBoard: GameBoard;
}

export const activeGameDisplayChain = ChainBuilder.build(
  [boardStart, readyToPlayCheck, checkIfWinner, activeDataToSend],
  false,
);
