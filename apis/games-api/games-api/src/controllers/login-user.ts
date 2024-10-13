import { Request, Response } from 'express';
import verifyUser from '../services/prisma/users/verify-user.ts';
import notRegisteredUserError from '../errors/not-registered-user-error.ts';
import findUser from '../services/prisma/users/find-user.ts';

const loginUser = async (req: Request, resp: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUser(email);
    if (!user) {
      console.log('no user');
      resp.status(401).json(notRegisteredUserError());
    }
    const verifiedUser = await verifyUser(password, user.password);
    if (!verifiedUser) {
      resp.status(401).json({ errorMessage: 'Incorrect password. Please try again' });
    }
    const activeUser = {
      id: user.id,
      playerName: user.player_name,
      friends: user.friends,
      activeGames: user.active_games,
      thumbnail: user.thumbnail,
    };

    resp.status(200).json(activeUser);
  } catch (err) {
    console.error(err);
    resp.status(500).json({ errorMessage: 'Login failed' });
  }
};

export default loginUser;
