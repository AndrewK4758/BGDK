import { ContextBuilder } from '@aklapper/chain';
import { getActiveGame } from '@aklapper/de-referencing-utilities';
import { GameContextKeys } from '@aklapper/game-types';
import { IInstanceOfGame } from '@aklapper/instance-of-game';
import { Request, Response } from 'express';
import { ChutesAndLaddersGame } from './list-games';

export const performAction = (req: Request, resp: Response) => {
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
