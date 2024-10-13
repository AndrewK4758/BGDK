import { ChainBuilder } from '@bgdk/chain';
import { GameBoard } from '@bgdk/games-components-logic';
import { IActivePlayersInGame } from '@bgdk/types-game';
import { activeDataToSend } from '../commands/action-board/active-game-data-to-send.ts';
import { boardStart } from '../commands/action-board/board-start.ts';
import { checkIfWinner } from '../commands/action-board/check-if-winner.ts';
import { readyToPlayCheck } from '../commands/action-board/ready-to-play.ts';

export interface IPlayersAndBoard extends IActivePlayersInGame {
  gameBoard: GameBoard;
}

export const activeGameDisplayChain = ChainBuilder.build(
  [boardStart, readyToPlayCheck, checkIfWinner, activeDataToSend],
  false,
);
