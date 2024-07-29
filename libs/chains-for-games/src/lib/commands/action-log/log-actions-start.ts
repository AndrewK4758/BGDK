import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';

export const logAction = CommandBuilder.build((context: Context) => {
  const { action } = deRefContextObject(context);
  if (action) {
    console.log(`Action: ${action}`);
    return true;
  } else return false;
});
