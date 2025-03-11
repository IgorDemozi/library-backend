import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'Email é obrigatório' }),
  password: z.string().min(8, { message: 'A senha deve ter ao menos 8 caracteres.' }),
});
