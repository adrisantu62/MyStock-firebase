import { Request, Response, NextFunction } from 'express';
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from '../errors/domain.errors';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log básico (luego puede ser winston / sentry)
  console.error(err);

  if (err instanceof BadRequestError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(409).json({ error: err.message });
  }

  // Errores no controlados
  return res.status(500).json({
    error: 'Error interno del servidor',
  });
}
