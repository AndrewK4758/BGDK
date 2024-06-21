import { IBuiltGame } from '@bgdk/game-builder';
import { Request, Response } from 'express';
import { games } from './list-games';

export const sendGameList = async (req: Request, resp: Response) => {
  const gamesToSend = games.map((game) => {
    return {
      name: game.name,
      id: game.id,
      description: game.description,
      rules: game.rules,
      imageURL: game.imageURL,
    };
  }) as IBuiltGame[];
  resp.status(200).json(gamesToSend);
};
