import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { GameContextKeys } from '@bgdk/types-game';

export const outputContextResponse = CommandBuilder.build((context: Context) => {
  const { resp } = deRefContextObject(context);
  if (resp) {
    if (context.get(GameContextKeys.OUTPUT)) {
      resp.status(201).json(context.get(GameContextKeys.OUTPUT));
      return true;
    } else {
      resp.sendStatus(200);
      return true;
    }
  }
  return false;
});
