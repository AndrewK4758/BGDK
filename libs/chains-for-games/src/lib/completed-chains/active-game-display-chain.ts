import { ChainBuilder } from '@bgdk/chain';
import { type ILiteSpace } from '@bgdk/types-game';
import { IActivePlayersInGame } from '@bgdk/types-game';
import activeDataToSend from '../commands/action-board/active-game-data-to-send';
import boardStart from '../commands/action-board/board-start';
import checkIfWinner from '../commands/action-board/check-if-winner';
import readyToPlayCheck from '../commands/action-board/ready-to-play';

export interface IPlayersAndBoard extends IActivePlayersInGame {
  gameBoard: ILiteSpace[];
}

export const activeGameDisplayChain = ChainBuilder.build(
  [boardStart, readyToPlayCheck, checkIfWinner, activeDataToSend],
  false,
);
