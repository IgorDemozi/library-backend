import { Request, Response } from 'express';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { CreateBookUseCase } from './CreateBookUseCase';

class CreateBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const imgWeb = req.file;
    const imgMobile = req.files as Express.Multer.File[];
    const { title, author, genre, systemEntryDate, synopsis } = JSON.parse(req.body.newBookData);

    const bookRepository = new BookRepository();
    const createBookUseCase = new CreateBookUseCase(bookRepository);

    try {
      const book = await createBookUseCase.execute({
        title,
        author,
        genre,
        systemEntryDate,
        synopsis,
        img: imgWeb ?? imgMobile[0],
      });

      return res.status(201).json(book);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { CreateBookController };
