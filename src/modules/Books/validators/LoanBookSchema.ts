import { z } from 'zod';

export const LoanBookSchema = z.object({
  studentName: z.string().min(1),
  class: z.string().min(1),
  loanDate: z.date(),
  returnDate: z.date(),
});
