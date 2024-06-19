import {
  activeGameDisplayChain,
  loadRegisterChain,
  logActionChain,
  outputContextResponseChain,
  registerChain,
  resetGameChain,
  startGameChain,
  turnChain,
} from '@bgdk/chains-for-games';
import { GameBuilder, IBuiltGame } from '@bgdk/game-builder';

const gb = new GameBuilder();
const games: IBuiltGame[] = [];

export const ChutesAndLaddersGame = gb
  .setId('0')
  .setName('Chutes & Ladders')
  .setDescription('First Game')
  .setImageURL('ChutesAndLaddersT.webp')
  .setRule(
    1,
    'INSTRUCTIONS',
    `For 2 to 4 Players/AGES 3+
  This delightful game is simple and easy to play, even
  for children who can’t read. Fun pictures help kids
  understand the rewards of doing good deeds as
  they climb up the ladders and the consequences of
  naughty ones as they slide down the chutes.`
  )
  .setRule(
    2,
    'SETUP',
    `Everyone
    chooses a pawn to play. Any extra pawns are out of
    #1. Now get ready for the fun! `
  )
  .setGameFunctionality([
    logActionChain,
    loadRegisterChain,
    registerChain,
    turnChain,
    resetGameChain,
    startGameChain,
    activeGameDisplayChain,
    outputContextResponseChain,
  ])

  .build();

games.push(ChutesAndLaddersGame);

export const TicTacToe = gb
  .setId('1')
  .setName('Tic Tac Toe')
  .setDescription('Second Game Placeholder')
  .setImageURL('TicTacToeT.webp')
  .setRule(1, 'SETUP', `The game is played on a 3x3 grid`)
  .setRule(
    2,
    'TURNS',
    `Players take turns marking an empty square with their symbol (X or O)`
  )
  .setRule(
    3,
    'WIN',
    `The first player to get three of their marks in a row (up, down, across, or diagonally) wins`
  )
  .setGameFunctionality([])
  .build();

games.push(TicTacToe);

export { games };
