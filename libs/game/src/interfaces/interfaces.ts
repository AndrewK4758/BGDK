import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { IPlayer } from '@bgdk/types-game';

export interface IGame{
  instance: ChutesAndLadders ;
  playersArray: IPlayer[];
  playerInTurn: IPlayer;
  readyToPlay: boolean;
  haveWinner: boolean;
  currentPlayer: number;
  MIN_PLAYERS: number,
  MAX_PLAYERS: number
}
