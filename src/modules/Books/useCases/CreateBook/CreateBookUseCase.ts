import { validateSchemaOrThrowAppError } from '../../../../shared/utils/validateSchemaOrThrowAppError';
import { ICreateBookDTO } from '../../dtos/ICreateBookDTO';
import { Book } from '../../entities/Book';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { CreateBookSchema } from '../../validators/CreateBookSchema';

class CreateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute({ title, author, genre, systemEntryDate, synopsis, img }: ICreateBookDTO): Promise<Book> {
    const bookData = {
      title: title,
      author: author,
      genre: genre,
      image: img ? img.filename : '',
      systemEntryDate: systemEntryDate,
      synopsis: synopsis,
    };

    validateSchemaOrThrowAppError(CreateBookSchema, bookData);

    const book = await this.bookRepository.createBook(bookData);

    return book;
  }
}

export { CreateBookUseCase };
