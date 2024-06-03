import { ChainBuilder, CommandBuilder, Context } from '@aklapper/chain';
import { deRefContextObject } from '@aklapper/model';

export const logAction = CommandBuilder.build((context: Context) => {
  const { action } = deRefContextObject(context);
  if (action) {
    console.log(`Action: ${action}`);
    return true;
  } else return false;
});

export const logActionChain = ChainBuilder.build([logAction], false);
