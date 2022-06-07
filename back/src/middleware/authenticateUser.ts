import { Request, Response, NextFunction } from 'express'
import _authenticator from '../services/authenticator';

const authenticator = new _authenticator();

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization as string;

  if (!authHeader) res.status(401).send({ error: "Token must be provided." })

  const tokenData = authenticator.getTokenData(authHeader);

  if (tokenData.error) return res.status(401).send({ error: tokenData.error });

  res.locals.authenticationUser = tokenData;

  next();
}


export default authenticateUser;

