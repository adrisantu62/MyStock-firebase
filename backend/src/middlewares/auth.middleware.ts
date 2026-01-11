import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    role?: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = header.split(' ')[1];

  console.log('Token recibido:', token);
  try {
    const decoded = await auth.verifyIdToken(token);

    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      role: decoded.role || 'user',
    };

    console.log('Usuario autenticado:', req.user);
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
