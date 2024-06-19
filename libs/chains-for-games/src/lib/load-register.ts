import { ChainBuilder, CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import {
  GameContextKeys,
  GameInstanceID,
  ILoadRegisterData,
} from '@bgdk/game-types';

export const loadRegister = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.ACTION) &&
    context.getString(GameContextKeys.ACTION) === 'load-register'
  ) {
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
  if (
    context.get(GameContextKeys.NEXT) &&
    context.getString(GameContextKeys.NEXT) === 'send-load-register-data'
  ) {
    const { req, resp } = deRefContextObject(context);
    resp.setHeader(
      'current-game',
      req.header('current-game') as GameInstanceID
    );
    return true;
  } else return false;
});

export const loadRegisterChain = ChainBuilder.build(
  [loadRegister, sendLoadRegister],
  false
);
