import { ChainBuilder } from '@bgdk/chain';
import rotatePlayer from '../commands/action-take-turn/rotate-player';
import setGamePiece from '../commands/action-take-turn/set-game-piece';
import takeTurnStart from '../commands/action-take-turn/take-turn-start';
import verifyPlayerTakingTurn from '../commands/action-take-turn/verify-player-taking-turn';
import wonGameCheckTicTacToe from '../commands/action-take-turn/won-game-tic-tac-toe';

export const turnChainTicTacToe = ChainBuilder.build(
  [takeTurnStart, verifyPlayerTakingTurn, setGamePiece, wonGameCheckTicTacToe, rotatePlayer],
  false,
);
