import { Response, NextFunction } from 'express';
import { email, IReqObjMaps } from '@bgdk/types-api';
import { JwtPayload, verify } from 'jsonwebtoken';

export interface IDecodedToken extends JwtPayload {
  email: email;
  password: string;
}

const authenticateUser = async (req: IReqObjMaps, resp: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  console.log(authHeader, 'IN AUTHENTICATE USER MIDDLEWARE');
  if (!authHeader) return next();
  else {
    try {
      const decodedToken = verify(authHeader, process.env['JWT_SECRET']) as IDecodedToken;
      console.log(decodedToken, 'decoded token');

      next();
    } catch (error) {
      console.error(error);
      resp.status(401).json({ errorMessage: 'Invalid Token' });
    }
  }
};

export default authenticateUser;
