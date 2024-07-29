import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { GameContextKeys, GameInstanceID } from '@bgdk/types-game';

export const sendLoadRegister = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'send-load-register-data') {
    const { req, resp } = deRefContextObject(context);
    resp.setHeader('current-game', req.header('current-game') as GameInstanceID);
    return true;
  } else return false;
});
