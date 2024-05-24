import { ChainBuilder, CommandBuilder, Context } from '@aklapper/chain';
import { deRefContextObject } from '@aklapper/model';

export const logAction = CommandBuilder.build((context: Context) => {
  const { action } = deRefContextObject(context);
  console.log(`Action: ${action}`);
  return true;
});

export const logActionChain = ChainBuilder.build([logAction], false);
