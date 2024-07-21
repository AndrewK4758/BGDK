import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Player } from '@bgdk/games-components-logic';

export interface IGame {
  instance: ChutesAndLadders;
  playersArray: Player[];
  playerInTurn: Player;
  readyToPlay: boolean;
  haveWinner: boolean;
  currentPlayer: number;
  MIN_PLAYERS: number;
  MAX_PLAYERS: number;
}
