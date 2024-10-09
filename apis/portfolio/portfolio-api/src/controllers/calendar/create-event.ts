import type { NextFunction, Request, Response } from 'express';

const createEvent = async (req: Request, resp: Response, next: NextFunction) => {
  try {
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default createEvent;
