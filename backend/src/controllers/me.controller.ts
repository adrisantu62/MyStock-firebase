import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getMe = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  return res.status(200).json({
    uid: req.user.uid,
    email: req.user.email,
    role: req.user.role,
  });
};
