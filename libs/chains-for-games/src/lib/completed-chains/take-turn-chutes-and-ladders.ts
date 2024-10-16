import { ChainBuilder } from '@bgdk/chain';
import { moveAvatar } from '../commands/action-take-turn/move-avatar.js';
import { rollDice } from '../commands/action-take-turn/roll-dice.js';
import { rotatePlayer } from '../commands/action-take-turn/rotate-player.js';
import { takeTurnStart } from '../commands/action-take-turn/take-turn-start.js';
import { verifyPlayerTakingTurn } from '../commands/action-take-turn/verify-player-taking-turn.js';
import { wonGameCheckChutesAndLadders } from '../commands/action-take-turn/won-game-chutes-and-ladders.js';

export const turnChain = ChainBuilder.build(
  [takeTurnStart, verifyPlayerTakingTurn, rollDice, moveAvatar, wonGameCheckChutesAndLadders, rotatePlayer],
  false,
);
