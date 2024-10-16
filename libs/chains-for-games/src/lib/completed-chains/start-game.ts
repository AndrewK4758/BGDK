import { ChainBuilder } from '@bgdk/chain';
import { sendStartGameStatus } from '../commands/action-start-game/send-start-game-status.js';
import { setAvatarOnStartChutesAndLadders } from '../commands/action-start-game/set-on-start-chutes-and-ladders.js';
import { setPlayerInTurn } from '../commands/action-start-game/set-player-in-turn.js';
import { startGame } from '../commands/action-start-game/start-game-start.js';
import { verifyReadyToPlay } from '../commands/action-start-game/verify-ready-to-play.js';

export const startGameChain = ChainBuilder.build(
  [startGame, verifyReadyToPlay, setAvatarOnStartChutesAndLadders, setPlayerInTurn, sendStartGameStatus],
  false,
);
