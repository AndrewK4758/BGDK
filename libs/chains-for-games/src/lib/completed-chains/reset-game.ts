import { ChainBuilder } from '@bgdk/chain';
import { clearAvatarsFromSpaces } from '../commands/action-reset-game/clear-spaces';
import { flipHaveWinnerFlag } from '../commands/action-reset-game/flip-winner-flag';
import { makeNewGameBoard } from '../commands/action-reset-game/make-new-game-board';
import { resetGame } from '../commands/action-reset-game/reset-game-start';

export const resetGameChain = ChainBuilder.build(
  [resetGame, flipHaveWinnerFlag, clearAvatarsFromSpaces, makeNewGameBoard],
  false,
);
