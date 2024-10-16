import { ChainBuilder } from '@bgdk/chain';
import { clearAvatarsFromSpaces } from '../commands/action-reset-game/clear-spaces.js';
import { flipHaveWinnerFlag } from '../commands/action-reset-game/flip-winner-flag.js';
import { makeNewGameBoard } from '../commands/action-reset-game/make-new-game-board.js';
import { resetGame } from '../commands/action-reset-game/reset-game-start.js';

export const resetGameChain = ChainBuilder.build(
  [resetGame, flipHaveWinnerFlag, clearAvatarsFromSpaces, makeNewGameBoard],
  false,
);
