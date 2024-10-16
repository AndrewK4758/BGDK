import { ChainBuilder } from '@bgdk/chain';
import { rotatePlayer } from '../commands/action-take-turn/rotate-player.js';
import { setGamePiece } from '../commands/action-take-turn/set-game-piece.js';
import { takeTurnStart } from '../commands/action-take-turn/take-turn-start.js';
import { verifyPlayerTakingTurn } from '../commands/action-take-turn/verify-player-taking-turn.js';
import { wonGameCheckTicTacToe } from '../commands/action-take-turn/won-game-tic-tac-toe.js';

export const turnChainTicTacToe = ChainBuilder.build(
  [takeTurnStart, verifyPlayerTakingTurn, setGamePiece, wonGameCheckTicTacToe, rotatePlayer],
  false,
);
