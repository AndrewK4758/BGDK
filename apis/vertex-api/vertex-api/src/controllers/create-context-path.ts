import { Request, Response } from 'express';
import ShortUniqueId from 'short-unique-id';

const createContextPath = (_req: Request, resp: Response) => {
  try {
    const contextId = new ShortUniqueId().randomUUID();

    resp.status(201).send(contextId);
  } catch (err) {
    console.error(err);

    resp.sendStatus(500);
  }
};

export default createContextPath;
