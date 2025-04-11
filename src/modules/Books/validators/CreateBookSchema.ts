import { z } from 'zod';

export const CreateBookSchema = z.object({
  title: z.string().min(1, 'Campo obrigatório'),
  author: z.string().min(1, 'Campo obrigatório'),
  genre: z.string().min(1, 'Campo obrigatório'),
  image: z.string().min(1, 'Campo obrigatório'),
  systemEntryDate: z.string().min(1, 'Campo obrigatório'),
  synopsis: z.string().min(1, 'Campo obrigatório'),
});
