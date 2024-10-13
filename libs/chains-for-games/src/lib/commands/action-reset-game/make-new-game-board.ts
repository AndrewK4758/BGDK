import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { Space } from '@bgdk/games-components-logic';
import { GameContextKeys } from '@bgdk/types-game';

export const makeNewGameBoard = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'make-game-board') {
    const { game } = deRefContextObject(context);

    let space: Space = game.instance.instance.startSpace;

    while (space) {
      if (space.occupied) space.leave();
      space = space.next;
    }

    game.instance.instance.makeGameBoard();
    context.put(GameContextKeys.ACTION, 'start');

    return true;
  } else return false;
});
