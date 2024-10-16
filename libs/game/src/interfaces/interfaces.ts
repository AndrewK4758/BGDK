import { Player } from '@bgdk/games-components-logic';
import { AllGameTypes } from '../types/all-games-types.js';

export interface IGame {
  instance: AllGameTypes;
  playersArray: Player[];
  playerInTurn: Player;
  readyToPlay: boolean;
  haveWinner: boolean;
  currentPlayer: number;
}
