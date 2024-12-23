import { z } from 'zod';

export const CreateBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  image: z.string().min(1),
  systemEntryDate: z.string().min(1),
  synopsis: z.string().min(1),
});
