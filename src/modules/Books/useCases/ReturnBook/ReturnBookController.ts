import { Request, Response } from 'express';
import prisma from '../../../../database/prismaClient';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { ReturnBookUseCase } from './ReturnBookUseCase';

class ReturnBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const book = await prisma.book.findUnique({ where: { id: id } });

    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    if (book.isRented === false) {
      return res.status(400).json({ error: 'Livro não está emprestado' });
    }
    if (book.isActive === false) {
      return res.status(400).json({ error: 'Livro inativo' });
    }

    const bookRepository = new BookRepository();
    const returnBookUseCase = new ReturnBookUseCase(bookRepository);

    try {
      const book = await returnBookUseCase.execute(id);
      return res.status(201).json(book);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { ReturnBookController };
