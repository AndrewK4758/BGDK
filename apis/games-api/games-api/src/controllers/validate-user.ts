import { IReqObjMaps } from '@bgdk/types-api';
import { Response } from 'express';
import findUser from '../services/prisma/users/find-user';
import type { Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

const validateUser = async (req: IReqObjMaps, resp: Response) => {
  const { email } = req.query;
  try {
    const query: Prisma.usersFindUniqueArgs<DefaultArgs> = {
      where: { email: email as string },
    };

    const currentUser = await findUser(query);

    if (currentUser) resp.status(200).json({ message: 'Email already registered - Please login to continue' });
    else resp.sendStatus(200);
  } catch (err) {
    console.error(err);
    resp.status(500).json({ message: 'Error on user lookup. Please enter email again' });
  }
};

export default validateUser;
