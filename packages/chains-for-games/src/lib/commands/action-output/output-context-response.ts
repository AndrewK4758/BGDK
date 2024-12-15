import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/utils';
import { Context, GameContextKeys } from '@bgdk/types-game';

const origin = process.env.NODE_ENV === 'production' ? 'https://www.andrew-k.us' : 'http://localhost:4700';

export const outputContextResponse = CommandBuilder.build((context: Context) => {
  const { resp } = deRefContextObject(context);
  if (resp) {
    resp.setHeader('Access-Control-Allow-Origin', origin);
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

export default outputContextResponse;
