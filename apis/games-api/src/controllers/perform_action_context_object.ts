import { ContextBuilder } from '@bgdk/chain';
import { getActiveGame } from '@bgdk/de-referencing-utilities';
import { GameContextKeys } from '@bgdk/game-types';
import { IInstanceOfGame } from '@bgdk/instance-of-game';
import { Request, Response } from 'express';
import { ChutesAndLaddersGame } from './list-games';

const performAction = (req: Request, resp: Response) => {
  console.log('Perform Action Called');
  const game = getActiveGame(req) as IInstanceOfGame;
  console.log(
    `Got Game: ${JSON.stringify(game.gameInstanceID)}: ${
      game.instance.instance.constructor.name
    }`
  );
  if (game) {
    const { action } = req.params;
    const ctx = ContextBuilder.build();
    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.REQUEST, req);
    ctx.put(GameContextKeys.RESPONSE, resp);
    ctx.put(GameContextKeys.ACTION, action);
    ctx.put(GameContextKeys.NEXT, '');

    ChutesAndLaddersGame.chain.execute(ctx);
  } else {
    resp.sendStatus(404);
  }
};

export default performAction;