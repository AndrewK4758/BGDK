import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/utils';
import { Context, GameContextKeys } from '@bgdk/types-game';

export const rollDice = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'roll-dice') {
    const { game } = deRefContextObject(context);

    const moveDist = game.instance.instance.DIE.roll();
    context.put('move-dist', moveDist as number);
    context.put(GameContextKeys.NEXT, 'move-avatar');
    return true;
  } else return false;
});

export default rollDice;
