import { IInstanceOfGame } from '@bgdk/instance-of-game';
import { GameContextKeys } from '@bgdk/game-types';
import { Context } from '@bgdk/chain';
import { Request, Response } from 'express';

export type ContextData = {
  action: string;
  game: IInstanceOfGame;
  req: Request;
  resp: Response;
  next: string;
  output: object;
};

export const deRefContextObject = (context: Context): ContextData => {
  const action = context.get(GameContextKeys.ACTION) as string;
  const game = context.get(GameContextKeys.GAME) as IInstanceOfGame;
  const req = context.get(GameContextKeys.REQUEST) as Request;
  const resp = context.get(GameContextKeys.RESPONSE) as Response;
  const next = context.get(GameContextKeys.NEXT) as string;
  const output = context.get(GameContextKeys.OUTPUT) as object;

  return {
    action: action,
    game: game,
    req: req,
    resp: resp,
    next: next,
    output: output,
  };
};
