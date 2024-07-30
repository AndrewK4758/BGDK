import { ContextBuilder } from '@bgdk/chain';
import { activeGameDisplayChain } from '@bgdk/chains-for-games';
import { getActiveGame } from '@bgdk/de-referencing-utilities';
import { InstanceOfGame } from '@bgdk/instance-of-game';
import { IReqObjMaps } from '@bgdk/types-api';
import { GameContextKeys } from '@bgdk/types-game';
import { Response } from 'express';
import SocketServer from '../services/socket-io/socket-server';

const performAction = async (req: IReqObjMaps, resp: Response, gameWS: InstanceOfGame, actionWS: string) => {
  console.log('Perform Action Called');
  //check for no rest-api objects
  if (!req && !resp) {
    if (gameWS) {
      const ctx = ContextBuilder.build();
      ctx.put(GameContextKeys.ACTION, actionWS);
      ctx.put(GameContextKeys.IO, SocketServer.instance.io);
      ctx.put(GameContextKeys.GAME, gameWS);

      activeGameDisplayChain.execute(ctx);
    } else {
      SocketServer.instance.io.emit('no-game-error', 'GAME NOT FOUND');
    }
  } else {
    // if rest-api objects
    const game = getActiveGame(req) as InstanceOfGame;
    if (game) {
      console.log(`Got Game: ${game.gameInstanceID}: ${game.instance.instance.constructor.name}`);
      const { action } = req.params;
      const ctx = ContextBuilder.build();
      ctx.put(GameContextKeys.ACTION, action);
      ctx.put(GameContextKeys.GAME, game);
      ctx.put(GameContextKeys.REQUEST, req);
      ctx.put(GameContextKeys.RESPONSE, resp);
      ctx.put(GameContextKeys.NEXT, '');

      req.gameSpecificChain.execute(ctx);
    } else {
      resp.sendStatus(404);
    }
  }
};

export default performAction;
