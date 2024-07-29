import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { getCurrentMinute } from '@bgdk/instance-of-game';
import { GameContextKeys } from '@bgdk/types-game';

export const resetGame = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.ACTION) && context.getString(GameContextKeys.ACTION) === 'reset') {
    const { game, req } = deRefContextObject(context);
    context.put('req-params-id', req.params['id'] as string);
    game.updateLastActive(getCurrentMinute());
    context.put(GameContextKeys.NEXT, 'flip-winner-flag');
    return true;
  } else return false;
});
