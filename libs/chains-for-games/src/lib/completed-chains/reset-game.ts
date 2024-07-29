import { ChainBuilder } from '@bgdk/chain';
import { resetGame } from '../commands/action-reset-game/reset-game-start';
import { flipHaveWinnerFlag } from '../commands/action-reset-game/flip-have-winner';
import { makeNewGameBoard } from '../commands/action-reset-game/make-new-game-board';

export const resetGameChain = ChainBuilder.build([resetGame, flipHaveWinnerFlag, makeNewGameBoard], false);
