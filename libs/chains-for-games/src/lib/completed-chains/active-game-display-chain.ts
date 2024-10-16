import { ChainBuilder } from '@bgdk/chain';
import { GameBoard } from '@bgdk/games-components-logic';
import { IActivePlayersInGame } from '@bgdk/types-game';
import { activeDataToSend } from '../commands/action-board/active-game-data-to-send.js';
import { boardStart } from '../commands/action-board/board-start.js';
import { checkIfWinner } from '../commands/action-board/check-if-winner.js';
import { readyToPlayCheck } from '../commands/action-board/ready-to-play.js';

export interface IPlayersAndBoard extends IActivePlayersInGame {
  gameBoard: GameBoard;
}

export const activeGameDisplayChain = ChainBuilder.build(
  [boardStart, readyToPlayCheck, checkIfWinner, activeDataToSend],
  false,
);
