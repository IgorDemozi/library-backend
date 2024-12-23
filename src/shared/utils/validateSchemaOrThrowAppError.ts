import { z, ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export function validateSchemaOrThrowAppError(validator: z.AnyZodObject, data: unknown) {
  try {
    validator.parse(data);
  } catch (err) {
    const error = `${(err as ZodError).issues[0].path[0]} ${(err as ZodError).issues[0].message}`;
    const errorCapitalized = error.charAt(0).toUpperCase() + error.slice(1);

    console.log('erro => ', errorCapitalized);

    throw new AppError(errorCapitalized);
  }
}
