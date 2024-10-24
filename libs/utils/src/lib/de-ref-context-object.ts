import { Context, GameContextKeys, ContextData, IInstanceOfGame } from '@bgdk/types-game';
import { Request, Response } from 'express';
import { Server } from 'socket.io';

export const deRefContextObject = (context: Context): ContextData => {
  const action = context.get(GameContextKeys.ACTION) as string;
  const game = context.get(GameContextKeys.GAME) as IInstanceOfGame;
  const req = context.get(GameContextKeys.REQUEST) as Request;
  const resp = context.get(GameContextKeys.RESPONSE) as Response;
  const next = context.get(GameContextKeys.NEXT) as string;
  const output = context.get(GameContextKeys.OUTPUT) as object;
  const io = context.get(GameContextKeys.IO) as Server;

  return {
    action: action,
    game: game,
    req: req,
    resp: resp,
    next: next,
    output: output,
    io: io,
  };
};
