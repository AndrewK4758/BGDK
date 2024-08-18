import { EmailAddress, IReqObjMaps } from '@bgdk/types-api';
import { Response } from 'express';
import findUser from '../services/prisma/users/find-user';

const validateUser = async (req: IReqObjMaps, resp: Response) => {
  const { email } = req.query;

  try {
    const currentUser = await findUser(email as EmailAddress);
    return currentUser
      ? resp.status(200).json({ message: 'Email already registered - Please login to continue' })
      : resp.sendStatus(200);
  } catch (err) {
    console.error(err);
    return resp.status(500).json({ message: 'Error on email lookup. Please enter email again' });
  }
};

export default validateUser;
