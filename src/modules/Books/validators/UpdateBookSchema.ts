import { z } from 'zod';

export const UpdateBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  image: z.string().optional(),
  systemEntryDate: z.string().min(1),
  synopsis: z.string().min(1),
});
