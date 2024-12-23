import { Request, Response } from 'express';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { GetAllBooksUseCase } from './GetAllBooksUseCase';

class GetAllBooksController {
  async handle(req: Request, res: Response): Promise<Response> {
    const bookRepository = new BookRepository();
    const getAllBooksUseCase = new GetAllBooksUseCase(bookRepository);

    try {
      const books = await getAllBooksUseCase.execute();
      return res.status(201).json(books);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { GetAllBooksController };
