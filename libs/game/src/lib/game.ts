import {
  Avatar,
  ChutesAndLadders,
  Player,
  generateRandomNumber,
} from '@bgdk/chutes-and-ladders';
import { Color, IPlayer, SpaceType } from '@bgdk/types-game';
import { IGame } from '../interfaces/interfaces';

export class Game implements IGame {
  game: ChutesAndLadders;
  playersArray: IPlayer[];
  playerInTurn!: IPlayer;
  readyToPlay: boolean;
  haveWinner: boolean;
  currentPlayer: number;
  constructor(instance: ChutesAndLadders) {
    this.game = instance;
    this.playersArray = [];
    this.readyToPlay = false;
    this.haveWinner = false;
    this.currentPlayer = 0;
  }

  get instance(): ChutesAndLadders {
    return this.game;
  }

  register(playerName: string, id: string, avatarName: string, color: Color) {
    const player = new Player(playerName, id);
    const avatar = new Avatar(avatarName, color);
    player.avatar = avatar;
    this.generatePlayerOrder(player);
  }

  generatePlayerOrder(player: IPlayer) {
    const unshiftOrPush = generateRandomNumber(2);
    if (unshiftOrPush === 1) this.playersArray.push(player);
    if (unshiftOrPush === 2) this.playersArray.unshift(player);
  }

  verifyReadyToPlay() {
    return (this.readyToPlay =
      this.playersArray.length >= this.instance.MIN_PLAYERS && this.playersArray.length <= this.instance.MAX_PLAYERS
        ? true
        : false);
  }

  rotatePlayers() {
    this.currentPlayer++;
    if (this.currentPlayer === this.playersArray.length) this.currentPlayer = 0;
    this.playerInTurn = this.playersArray[this.currentPlayer];
  }

  wonGame(locationType: SpaceType) {
    return locationType === SpaceType.FINISH;
  }
}
