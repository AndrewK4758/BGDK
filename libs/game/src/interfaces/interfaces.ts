import { ChutesAndLadders } from '@bgdk/chutes-and-ladders';
import { Color, IPlayer, SpaceType } from '@bgdk/types-game';

export interface IGame {
  game: unknown;
  playersArray: IPlayer[];
  playerInTurn: IPlayer;
  readyToPlay: boolean;
  haveWinner: boolean;
  currentPlayer: number;

  get instance(): ChutesAndLadders;

  register(playerName: string, id: string, avatarName: string, color: Color): void;
  generatePlayerOrder(player: IPlayer): void;
  verifyReadyToPlay(): boolean;
  rotatePlayers(): void;
  wonGame(locationType: SpaceType): boolean;
}
