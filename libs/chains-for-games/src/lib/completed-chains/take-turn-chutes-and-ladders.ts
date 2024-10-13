import { ChainBuilder } from '@bgdk/chain';
import { moveAvatar } from '../commands/action-take-turn/move-avatar.ts';
import { rollDice } from '../commands/action-take-turn/roll-dice.ts';
import { rotatePlayer } from '../commands/action-take-turn/rotate-player.ts';
import { takeTurnStart } from '../commands/action-take-turn/take-turn-start.ts';
import { verifyPlayerTakingTurn } from '../commands/action-take-turn/verify-player-taking-turn.ts';
import { wonGameCheckChutesAndLadders } from '../commands/action-take-turn/won-game-chutes-and-ladders.ts';

export const turnChain = ChainBuilder.build(
  [takeTurnStart, verifyPlayerTakingTurn, rollDice, moveAvatar, wonGameCheckChutesAndLadders, rotatePlayer],
  false,
);
