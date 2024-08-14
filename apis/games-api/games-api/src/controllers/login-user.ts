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
  console.log(req.loginData, 'LOGIN DATA');
  console.log(req.body, 'BODY DATA');
  try {
    const { email, password } = req.body;
    console.log(email, 'email');
    console.log(password, 'password');
    const user = await findUser(email);
    console.log(user);
    if (!user) {
      console.log('no user');
      return resp.status(401).json(notRegisteredUserError());
    }
    console.log(password, user.password);
    const verifiedUser = await verifyUser(password, user.password);
    if (!verifiedUser) {
      return resp.status(401).json({ errorMessage: 'Incorrect password. Please try again' });
    }
    const payload = {
      email: user.email,
      password: user.password,
    };
    const token = sign(payload, process.env['JWT_SECRET'], options);
    resp.cookie('bearer', token, { httpOnly: true, secure: true, sameSite: true });
    resp.status(200).json({ token });
    console.log(resp.getHeaders());
  } catch (err) {
    console.error(err);
    resp.status(500).json({ errorMessage: 'Login failed' });
  }
};

export default loginUser;
