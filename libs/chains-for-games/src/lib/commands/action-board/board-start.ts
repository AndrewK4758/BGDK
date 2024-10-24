import { CommandBuilder } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/utils';
import { Context, GameContextKeys, IPlayer, IRegisterFormValues } from '@bgdk/types-game';

export const boardStart = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.ACTION) &&
    context.getString(GameContextKeys.ACTION) === 'board' &&
    context.get(GameContextKeys.GAME)
  ) {
    const { game } = deRefContextObject(context);

    const activePlayersArray: IRegisterFormValues[] = game.instance.playersArray.map((p: IPlayer) => {
      return {
        playerName: p.name,
        avatarName: p.avatar.name,
        avatarColor: p.avatar.color,
      };
    });
    context.put('active-players-in-game', activePlayersArray);
    context.put(GameContextKeys.NEXT, 'ready-to-play-check');
    return true;
  } else return false;
});

export default boardStart;
