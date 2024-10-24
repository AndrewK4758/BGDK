import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/utils';
import { Context, GameContextKeys, ILoadRegisterData } from '@bgdk/types-game';

export const loadRegister = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.ACTION) && context.getString(GameContextKeys.ACTION) === 'load-register') {
    const { game } = deRefContextObject(context);

    const avatarNameAndColorLoaderData: ILoadRegisterData = {
      avatarList: game.instance.instance.avatarList,
      avatarColorList: game.instance.instance.colorList,
    };
    context.put(GameContextKeys.OUTPUT, avatarNameAndColorLoaderData);
    context.put(GameContextKeys.NEXT, 'send-load-register-data');

    return true;
  } else return false;
});
export default loadRegister;
