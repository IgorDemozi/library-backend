import { z } from 'zod';

export const DeactivateBookSchema = z.object({
  description: z.string().min(10),
});
