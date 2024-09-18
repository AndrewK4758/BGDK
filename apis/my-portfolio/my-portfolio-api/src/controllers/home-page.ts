import { Request, Response } from 'express';

const getReq = async (_req: Request, resp: Response) => {
  resp.json({ message: 'working' });
};

export default getReq;
