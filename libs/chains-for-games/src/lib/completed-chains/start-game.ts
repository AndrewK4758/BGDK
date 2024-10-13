import { ChainBuilder } from '@bgdk/chain';
import { sendStartGameStatus } from '../commands/action-start-game/send-start-game-status.ts';
import { setAvatarOnStartChutesAndLadders } from '../commands/action-start-game/set-on-start-chutes-and-ladders.ts';
import { setPlayerInTurn } from '../commands/action-start-game/set-player-in-turn.ts';
import { startGame } from '../commands/action-start-game/start-game-start.ts';
import { verifyReadyToPlay } from '../commands/action-start-game/verify-ready-to-play.ts';

export const startGameChain = ChainBuilder.build(
  [startGame, verifyReadyToPlay, setAvatarOnStartChutesAndLadders, setPlayerInTurn, sendStartGameStatus],
  false,
);
