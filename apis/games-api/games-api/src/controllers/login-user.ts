import { Response } from 'express';
import verifyUser from '../services/prisma/users/verify-user';
import notRegisteredUserError from '../errors/not-registered-user-error';
import findUser from '../services/prisma/users/find-user';
import { IReqObjMaps } from '@bgdk/types-api';

const loginUser = async (req: IReqObjMaps, resp: Response) => {
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
