import { ChainBuilder } from '@bgdk/chain';
import { sendStartGameStatus } from '../commands/action-start-game/send-start-game-status';
import { setAvatarOnStartChutesAndLadders } from '../commands/action-start-game/set-on-start-chutes-and-ladders';
import { setPlayerInTurn } from '../commands/action-start-game/set-player-in-turn';
import { startGame } from '../commands/action-start-game/start-game-start';
import { verifyReadyToPlay } from '../commands/action-start-game/verify-ready-to-play';

export const startGameChain = ChainBuilder.build(
  [startGame, verifyReadyToPlay, setAvatarOnStartChutesAndLadders, setPlayerInTurn, sendStartGameStatus],
  false,
);
