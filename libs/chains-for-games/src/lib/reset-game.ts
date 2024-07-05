import { ChainBuilder, CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { getCurrentMinute } from '@bgdk/instance-of-game';
import { GameContextKeys } from '@bgdk/types-game';

export const resetGame = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.ACTION) &&
    context.getString(GameContextKeys.ACTION) === 'reset'
  ) {
    const { game } = deRefContextObject(context);
    game.updateLastActive(getCurrentMinute());
    context.put(GameContextKeys.NEXT, 'flip-have-winner-flag');
    return true;
  } else return false;
});

export const flipHaveWinnerFlag = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'flip-have-winner-flag'
  ) {
    const { game } = deRefContextObject(context);

    game.instance.haveWinner = false;
    context.put(GameContextKeys.NEXT, 'make-game-board');
    return true;
  } else return false;
});

export const makeGameBoard = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'make-game-board'
  ) {
    const { game } = deRefContextObject(context);

    game.instance.instance.makeGameBoard();
    context.put(GameContextKeys.ACTION, 'start');

    return true;
  } else return false;
});

export const resetGameChain = ChainBuilder.build(
  [resetGame, flipHaveWinnerFlag, makeGameBoard],
  false
);
