import { ChainBuilder } from '@bgdk/chain';
import { takeTurnStart } from '../commands/action-take-turn/take-turn-start';
import { verifyPlayerTakingTurn } from '../commands/action-take-turn/verify-player-taking-turn';
import { rollDice } from '../commands/action-take-turn/roll-dice';
import { moveAvatar } from '../commands/action-take-turn/move-avatar';
import { wonGameCheckChutesAndLadders } from '../commands/action-take-turn/won-game-chutes-and-ladders';
import { rotatePlayer } from '../commands/action-take-turn/rotate-player';

export const turnChain = ChainBuilder.build(
  [takeTurnStart, verifyPlayerTakingTurn, rollDice, moveAvatar, wonGameCheckChutesAndLadders, rotatePlayer],
  false,
);
