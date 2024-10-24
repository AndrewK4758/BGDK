import type { users } from '@prisma/client';
import { Request, Response } from 'express';
import notRegisteredUserError from '../errors/not-registered-user-error';
import findUser from '../services/prisma/users/find-user';
import verifyUser from '../services/prisma/users/verify-user';

const loginUser = async (req: Request, resp: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUser(email);
    if (!user) {
      console.log('no user');
      resp.status(401).json(notRegisteredUserError());
    }
    const verifiedUser = await verifyUser(password, (user as users).password);
    if (!verifiedUser) {
      resp.status(401).json({ errorMessage: 'Incorrect password. Please try again' });
    } else {
      const activeUser = {
        id: (user as users).id,
        playerName: (user as users).player_name,
        friends: (user as users).friends,
        activeGames: (user as users).active_games,
        thumbnail: (user as users).thumbnail,
      };

      resp.status(200).json(activeUser);
    }
  } catch (err) {
    console.error(err);
    resp.status(500).json({ errorMessage: 'Login failed' });
  }
};

export default loginUser;
