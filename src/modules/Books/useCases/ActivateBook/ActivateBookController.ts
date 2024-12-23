import { Request, Response } from 'express';
import prisma from '../../../../database/prismaClient';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { ActivateBookUseCase } from './ActivateBookUseCase';

class ActivateBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const livro = await prisma.book.findUnique({ where: { id: id } });

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    if (livro.isActive) {
      return res.status(400).json({ error: 'Livro já está ativado' });
    }

    const bookRepository = new BookRepository();
    const activateBookUseCase = new ActivateBookUseCase(bookRepository);

    try {
      const updatedBook = await activateBookUseCase.execute(id);
      return res.status(201).json(updatedBook);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { ActivateBookController };
