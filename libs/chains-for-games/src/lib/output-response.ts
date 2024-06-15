import { ChainBuilder, CommandBuilder, Context } from '@aklapper/chain';
import { deRefContextObject } from '@aklapper/de-referencing-utilities';
import { GameContextKeys } from '@aklapper/game-types';

export const outputContextResponse = CommandBuilder.build(
  (context: Context) => {
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
  }
);

export const outputContextResponseChain = ChainBuilder.build(
  [outputContextResponse],
  false
);
