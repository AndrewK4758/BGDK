import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { Player } from '@bgdk/games-components-logic';
import { GameContextKeys, IRegisterFormValues } from '@bgdk/types-game';

export const boardStart = CommandBuilder.build((context: Context) => {
  if (
    context.get(GameContextKeys.ACTION) &&
    context.getString(GameContextKeys.ACTION) === 'board' &&
    context.get(GameContextKeys.GAME)
  ) {
    const { game } = deRefContextObject(context);

    const activePlayersArray: IRegisterFormValues[] = game.instance.playersArray.map((p: Player) => {
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
