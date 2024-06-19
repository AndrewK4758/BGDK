import { ChutesAndLadders, IPlayer } from '@bgdk/chutes-and-ladders';
import { Color, SpaceType } from '@bgdk/game-types';

export interface IGame {
  instance: ChutesAndLadders;
  playersArray: IPlayer[];
  playerInTurn: IPlayer;
  readyToPlay: boolean;
  haveWinner: boolean;
  currentPlayer: number;

  register(
    playerName: string,
    id: string,
    avatarName: string,
    color: Color
  ): void;
  generatePlayerOrder(player: IPlayer): void;
  verifyReadyToPlay(): boolean;
  rotatePlayers(): void;
  wonGame(locationType: SpaceType): boolean;
}
