import { BadRequestError } from '../errors/domain.errors';

/**
 * Normaliza un parámetro de Express que puede ser string | string[]
 */
export function getParamAsString(
  value: string | string[] | undefined,
  paramName: string
): string {
  if (!value) {
    throw new BadRequestError(`Parámetro ${paramName} requerido`);
  }

  if (Array.isArray(value)) {
    throw new BadRequestError(`Parámetro ${paramName} inválido`);
  }

  return value;
}
