import { CommandBuilder, Context } from '@bgdk/chain';
import { GameContextKeys } from '@bgdk/types-game';

const registerUserStart = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.ACTION) && context.getString(GameContextKeys.ACTION) === 'register-user') {
    return true;
  }

  return false;
});

export default registerUserStart;
