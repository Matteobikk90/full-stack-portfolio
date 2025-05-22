import { JWT_SECRET } from '@/utils/constants';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.cookies?.accessToken;
  if (!token) {
    res.status(401).json({ message: 'Missing token' });
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }

    if (err instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    res.status(500).json({ message: 'Authentication error' });
  }
}
