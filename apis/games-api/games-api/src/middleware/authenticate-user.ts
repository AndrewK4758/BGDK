import { Response, NextFunction } from 'express';
import { EmailAddress, IReqObjMaps } from '@bgdk/types-api';
import { JwtPayload, verify } from 'jsonwebtoken';

export interface IDecodedToken extends JwtPayload {
  userID: string;
  email: EmailAddress;
  password: string;
  playerName: string;
}

const authenticateUser = async (req: IReqObjMaps, resp: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return next();
  else {
    try {
      const decodedToken = verify(authHeader, process.env['JWT_SECRET']) as IDecodedToken;
      req.loginData = {
        userID: decodedToken.userID,
        email: decodedToken.email,
        password: decodedToken.password,
        playerName: decodedToken.playerName,
      };
      next();
    } catch (error) {
      console.error(error);
      // resp.status(401).json({ errorMessage: 'Invalid Token' });
      next();
    }
  }
};

export default authenticateUser;
