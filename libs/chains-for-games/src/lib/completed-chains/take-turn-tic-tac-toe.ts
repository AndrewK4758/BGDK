import { ChainBuilder } from '@bgdk/chain';
import { takeTurnStart } from '../commands/action-take-turn/take-turn-start';
import { verifyPlayerTakingTurn } from '../commands/action-take-turn/verify-player-taking-turn';
import { setGamePiece } from '../commands/action-take-turn/set-game-piece';
import { wonGameCheckTicTacToe } from '../commands/action-take-turn/won-game-tic-tac-toe';
import { rotatePlayer } from '../commands/action-take-turn/rotate-player';

export const turnChainTicTacToe = ChainBuilder.build(
  [takeTurnStart, verifyPlayerTakingTurn, setGamePiece, wonGameCheckTicTacToe, rotatePlayer],
  false,
);
