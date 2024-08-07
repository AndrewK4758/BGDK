import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { GameContextKeys } from '@bgdk/types-game';

export const flipHaveWinnerFlag = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'flip-winner-flag') {
    const { game } = deRefContextObject(context);

    game.instance.haveWinner = false;

    context.put(GameContextKeys.NEXT, 'clear-spaces');
    return true;
  } else return false;
});
