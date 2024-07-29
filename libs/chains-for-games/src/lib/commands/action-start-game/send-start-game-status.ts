import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { GameContextKeys, GameInstanceID } from '@bgdk/types-game';

export const sendStartGameStatus = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'send-start-game-status') {
    const { req, resp } = deRefContextObject(context);
    resp.setHeader('current-game', req.header('current-game') as GameInstanceID);
    context.put(GameContextKeys.OUTPUT, { message: 'Game Started' });
    return true;
  } else return false;
});
