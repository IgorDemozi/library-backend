import { Request, Response } from 'express';
import prisma from '../../../../database/prismaClient';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { validateSchemaOrThrowAppError } from '../../../../shared/utils/validateSchemaOrThrowAppError';
import { DeactivateBookSchema } from '../../validators/DeactivateBookSchema';
import { DeactivateBookUseCase } from './DeactivateBookUseCase';

class DeactivateBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { description } = req.body;
    const livro = await prisma.book.findUnique({ where: { id: id } });

    if (!description) {
      return res.status(400).json({ error: 'É necessário dar um motivo para a desativação' });
    }
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    try {
      validateSchemaOrThrowAppError(DeactivateBookSchema, { description });
    } catch (err) {
      return res.status(400).json(err);
    }

    const bookRepository = new BookRepository();
    const deactivateBookUseCase = new DeactivateBookUseCase(bookRepository);

    try {
      const updatedBook = await deactivateBookUseCase.execute(id, description);
      return res.status(201).json(updatedBook);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { DeactivateBookController };
