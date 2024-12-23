import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = 'minhaassinaturaparapoderusarautenticacaoviatoken';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('invalid token');
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    if (err instanceof Error) console.log('err => ', err.message);

    res.status(401).send({ auth: false });
  }
};
