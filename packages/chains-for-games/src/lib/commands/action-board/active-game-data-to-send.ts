import { CommandBuilder } from '@bgdk/chain';
import { Context, GameContextKeys, GameInstanceID, IRegisterFormValues, type ILiteSpace } from '@bgdk/types-game';
import { deRefContextObject } from '@bgdk/utils';
import { IPlayersAndBoard } from '../../completed-chains/active-game-display-chain';

export const activeDataToSend = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.NEXT) && context.getString(GameContextKeys.NEXT) === 'active-data-to-send') {
    const { req, resp, game, io } = deRefContextObject(context);

    const activeDataToSend: IPlayersAndBoard = {
      avatarInTurn: context.get('player-in-turn') as string,
      gameBoard: game.instance.instance.displayGameBoard() as ILiteSpace[],
      activePlayersInGame: context.get('active-players-in-game') as IRegisterFormValues[],
      winner: context.get('winner-message') as string,
    };

    if (!req && !resp) {
      console.log('In io.emit event handler');
      io.to(game.gameInstanceID).emit('game-data', activeDataToSend);
      return false;
    } else {
      resp.setHeader('current-game', req.header('current-game') as GameInstanceID);
      context.put(GameContextKeys.OUTPUT, activeDataToSend);
      return true;
    }
  } else return false;
});

export default activeDataToSend;
