import { ChainBuilder } from '@bgdk/chain';
import { rotatePlayer } from '../commands/action-take-turn/rotate-player.ts';
import { setGamePiece } from '../commands/action-take-turn/set-game-piece.ts';
import { takeTurnStart } from '../commands/action-take-turn/take-turn-start.ts';
import { verifyPlayerTakingTurn } from '../commands/action-take-turn/verify-player-taking-turn.ts';
import { wonGameCheckTicTacToe } from '../commands/action-take-turn/won-game-tic-tac-toe.ts';

export const turnChainTicTacToe = ChainBuilder.build(
  [takeTurnStart, verifyPlayerTakingTurn, setGamePiece, wonGameCheckTicTacToe, rotatePlayer],
  false,
);
