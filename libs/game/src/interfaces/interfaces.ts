import { Player } from '@bgdk/games-components-logic';
import { AllGameTypes } from '../types/all-games-types';

export interface IGame {
  instance: AllGameTypes;
  playersArray: Player[];
  playerInTurn: Player;
  readyToPlay: boolean;
  haveWinner: boolean;
  currentPlayer: number;
  MIN_PLAYERS: number;
  MAX_PLAYERS: number;
}
