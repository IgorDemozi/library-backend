import { validateSchemaOrThrowAppError } from '../../../../shared/utils/validateSchemaOrThrowAppError';
import { IUpdateBookDTO } from '../../dtos/IUpdateBookDTO';
import { Book } from '../../entities/Book';
import { IBookRepository } from '../../infra/repositories/types/IBookRepository';
import { UpdateBookSchema } from '../../validators/UpdateBookSchema';

class UpdateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(bookData: IUpdateBookDTO): Promise<Book | null> {
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
