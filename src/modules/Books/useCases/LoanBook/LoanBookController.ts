import { Request, Response } from 'express';
import prisma from '../../../../database/prismaClient';
import { RentHistory } from '../../../../types';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { LoanBookUseCase } from './LoanBookUseCase';

class LoanBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const newRentHistory: RentHistory = req.body;
    const book = await prisma.book.findUnique({ where: { id: id } });

    console.log('newRentHistory => ', newRentHistory);

    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    if (book.isRented) {
      return res.status(400).json({ error: 'Livro já emprestado' });
    }
    if (book.isActive === false) {
      return res.status(400).json({ error: 'Livro inativo' });
    }

    const bookRepository = new BookRepository();
    const loanBookUseCase = new LoanBookUseCase(bookRepository);

    try {
      const book = await loanBookUseCase.execute({ id, rentData: newRentHistory });
      return res.status(201).json(book);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { LoanBookController };
