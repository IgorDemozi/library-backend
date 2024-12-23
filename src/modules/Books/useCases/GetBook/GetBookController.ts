import { Request, Response } from 'express';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { GetBookUseCase } from './GetBookUseCase';

class GetBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const bookRepository = new BookRepository();
    const getBookUseCase = new GetBookUseCase(bookRepository);

    try {
      const book = await getBookUseCase.execute(id);

      return res.status(201).json(book);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { GetBookController };
