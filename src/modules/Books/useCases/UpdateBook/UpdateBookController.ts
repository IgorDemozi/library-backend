import { Request, Response } from 'express';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import prisma from '../../../../database/prismaClient';
import { UpdateBookUseCase } from './UpdateBookUseCase';
import { Book } from '../../entities/Book';

class UpdateBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const img = req.file;
    const newBookData: Book = JSON.parse(req.body.newBookData);

    const oldBook = await prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!oldBook) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    const bookRepository = new BookRepository();
    const updateBookUseCase = new UpdateBookUseCase(bookRepository);

    try {
      const book = await updateBookUseCase.execute({
        id,
        ...newBookData,
        img: img ? img.filename : oldBook.image,
      });

      return res.status(201).json(book);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { UpdateBookController };
