import { validateSchemaOrThrowAppError } from '../../../../shared/utils/validateSchemaOrThrowAppError';
import { IUpdateBookDTO } from '../../dtos/IUpdateBookDTO';
import { Book } from '../../entities/Book';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { UpdateBookSchema } from '../../validators/UpdateBookSchema';

class UpdateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(bookData: IUpdateBookDTO): Promise<Book> {
    validateSchemaOrThrowAppError(UpdateBookSchema, bookData);

    const dayMonthYear = bookData.systemEntryDate
      .toString()
      .split('-')
      .map(item => Number(item));

    const formattedBookData = {
      ...bookData,
      image: bookData.img,
      systemEntryDate: new Date(dayMonthYear[0], dayMonthYear[1] - 1, dayMonthYear[2]),
    };

    const book = await this.bookRepository.updateBook(formattedBookData);

    return book;
  }
}

export { UpdateBookUseCase };
