import { ChainBuilder } from '@bgdk/chain';
import { resetGame } from '../commands/action-reset-game/reset-game-start';
import { flipHaveWinnerFlag } from '../commands/action-reset-game/flip-winner-flag';
import { makeNewGameBoard } from '../commands/action-reset-game/make-new-game-board';
import { clearAvatarsFromSpaces } from '../commands/action-reset-game/clear-spaces-tic-tac-toe';

export const resetGameChain = ChainBuilder.build(
  [resetGame, flipHaveWinnerFlag, clearAvatarsFromSpaces, makeNewGameBoard],
  false,
);
