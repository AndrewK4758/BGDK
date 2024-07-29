import { ChainBuilder } from '@bgdk/chain';
import { startGame } from '../commands/action-start-game/start-game-start';
import { verifyReadyToPlay } from '../commands/action-start-game/verify-ready-to-play';
import { setAvatarOnStartChutesAndLadders } from '../commands/action-start-game/set-on-start-chutes-and-ladders';
import { setPlayerInTurn } from '../commands/action-start-game/set-player-in-turn';
import { sendStartGameStatus } from '../commands/action-start-game/send-start-game-status';

export const startGameChain = ChainBuilder.build(
  [startGame, verifyReadyToPlay, setAvatarOnStartChutesAndLadders, setPlayerInTurn, sendStartGameStatus],
  false,
);
