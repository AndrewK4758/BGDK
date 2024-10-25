export type NextCommandMap = Map<string, string>;

export const nextCommandMap = new Map<string, NextCommandMap>();
export const chutesAndLaddersNextCommandMap = new Map<string, string>();
export const ticTacToeNextCommandMap = new Map<string, string>();

export enum GameName {
  CHUTES_AND_LADDERS = 'Chutes-&-Ladders',
  TIC_TAC_TOE = 'Tic-Tac-Toe',
}

export enum CommandStrings {
  VERIFY_PLAYER = 'verify-player',
  VERIFY_READY_TO_PLAY = 'verify-ready-to-play',
  FLIP_WINNER_FLAG = 'flip-winner-flag',
}

nextCommandMap.set(GameName.CHUTES_AND_LADDERS, chutesAndLaddersNextCommandMap);
nextCommandMap.set(GameName.TIC_TAC_TOE, ticTacToeNextCommandMap);

chutesAndLaddersNextCommandMap.set(CommandStrings.VERIFY_PLAYER, 'roll-dice');
chutesAndLaddersNextCommandMap.set(CommandStrings.VERIFY_READY_TO_PLAY, 'set-avatars-on-start');
chutesAndLaddersNextCommandMap.set(CommandStrings.FLIP_WINNER_FLAG, 'make-game-board');

ticTacToeNextCommandMap.set(CommandStrings.VERIFY_READY_TO_PLAY, 'set-player-in-turn');
ticTacToeNextCommandMap.set(CommandStrings.VERIFY_PLAYER, 'set-game-piece');
ticTacToeNextCommandMap.set(CommandStrings.FLIP_WINNER_FLAG, 'clear-spaces');
