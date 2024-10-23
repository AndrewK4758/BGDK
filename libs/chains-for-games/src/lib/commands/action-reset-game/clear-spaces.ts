import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { Context, GameContextKeys, ISpace } from '@bgdk/types-game';

export const clearAvatarsFromSpaces = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'clear-spaces') {
    const { game } = deRefContextObject(context);

    let space: ISpace = game.instance.instance.startSpace;

    while (space) {
      if (space.occupied) space.leave();
      space = space.next;
    }

    context.put(GameContextKeys.NEXT, 'make-game-board');

    return true;
  } else return false;
});

export default clearAvatarsFromSpaces;
