import { Response } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';
import verifyUser from '../services/prisma/users/verify-user';
import notRegisteredUserError from '../errors/not-registered-user-error';
import findUser from '../services/prisma/users/find-user';
import { IReqObjMaps } from '@bgdk/types-api';

const options: Partial<SignOptions> = {
  expiresIn: '1hr',
  algorithm: 'HS256',
};

const loginUser = async (req: IReqObjMaps, resp: Response) => {
  try {
    const { email, password } = req.loginData ? req.loginData : req.body;
    const user = await findUser(email);
    if (!user) {
      console.log('no user');
      return resp.status(401).json(notRegisteredUserError());
    }
    const verifiedUser = await verifyUser(password, user.password);
    if (!verifiedUser) {
      return resp.status(401).json({ errorMessage: 'Incorrect password. Please try again' });
    }
    const payload = {
      email: user.email,
      password: password,
      playerName: user.player_name,
    };

    const token = sign(payload, process.env['JWT_SECRET'], options);
    resp.setHeader('Authorization', token);
    resp.cookie('bearer', token, { httpOnly: true, secure: true, sameSite: true });
    resp.status(200).json({ token });
  } catch (err) {
    console.error(err);
    resp.status(500).json({ errorMessage: 'Login failed' });
  }
};

export default loginUser;
