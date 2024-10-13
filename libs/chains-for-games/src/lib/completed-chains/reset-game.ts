import { ChainBuilder } from '@bgdk/chain';
import { clearAvatarsFromSpaces } from '../commands/action-reset-game/clear-spaces.ts';
import { flipHaveWinnerFlag } from '../commands/action-reset-game/flip-winner-flag.ts';
import { makeNewGameBoard } from '../commands/action-reset-game/make-new-game-board.ts';
import { resetGame } from '../commands/action-reset-game/reset-game-start.ts';

export const resetGameChain = ChainBuilder.build(
  [resetGame, flipHaveWinnerFlag, clearAvatarsFromSpaces, makeNewGameBoard],
  false,
);
