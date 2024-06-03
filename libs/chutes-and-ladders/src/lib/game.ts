import { Avatar } from './avatar';
import { ChutesAndLadders } from './chutes_and_ladders';
import { Color, IGame, SpaceType } from './interfaces';
import { Player } from './player';
import { generateRandomNumber } from './utils';

export class Game implements IGame {
  instance: ChutesAndLadders;
  playersArray: Player[];
  playerInTurn!: Player;
  readyToPlay: boolean;
  haveWinner: boolean;
  currentPlayer: number;
  constructor(instance: ChutesAndLadders) {
    this.instance = instance; 
    this.playersArray = [];
    this.readyToPlay = false;
    this.haveWinner = false;
    this.playerInTurn;
    this.currentPlayer = 0;
  }

  register(playerName: string, id: string, avatarName: string, color: Color) {
    const player = new Player(playerName, id);
    player.avatar = new Avatar(avatarName, color);
    this.generatePlayerOrder(player);
  }

  generatePlayerOrder(player: Player) {
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
