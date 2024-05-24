import { ChainBuilder, CommandBuilder, Context } from '@aklapper/chain';
import { deRefContextObject, GameContextKeys, ILoadRegisterData } from '@aklapper/model';

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

export const sendLoadRegister = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'send-load-register-data') {
    const { req, resp } = deRefContextObject(context);
    const __current_game__ = req.header('__current_game__');
    resp.setHeader('__current_game__', __current_game__ as string);
    return true;
  } else return false;
});

export const loadRegisterChain = ChainBuilder.build([loadRegister, sendLoadRegister], false);
