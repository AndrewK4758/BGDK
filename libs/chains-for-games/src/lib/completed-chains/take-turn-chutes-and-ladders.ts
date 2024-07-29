import { ChainBuilder } from '@bgdk/chain';
import { moveAvatar } from '../commands/action-take-turn/move-avatar';
import { rollDice } from '../commands/action-take-turn/roll-dice';
import { rotatePlayer } from '../commands/action-take-turn/rotate-player';
import { takeTurnStart } from '../commands/action-take-turn/take-turn-start';
import { verifyPlayerTakingTurn } from '../commands/action-take-turn/verify-player-taking-turn';
import { wonGameCheckChutesAndLadders } from '../commands/action-take-turn/won-game-chutes-and-ladders';

export const turnChain = ChainBuilder.build(
  [takeTurnStart, verifyPlayerTakingTurn, rollDice, moveAvatar, wonGameCheckChutesAndLadders, rotatePlayer],
  false,
);
