import { z } from 'zod';
import { RentHistory } from '../../../../types';
import { Book } from '../../entities/Book';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';
import { validateSchemaOrThrowAppError } from '../../../../shared/utils/validateSchemaOrThrowAppError';
import { LoanBookSchema } from '../../validators/LoanBookSchema';

interface LoanBookUseCaseProps {
  id: string;
  rentData: RentHistory;
}

class LoanBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(bookData: LoanBookUseCaseProps): Promise<Book> {
    const { rentData } = bookData;

    const splitloanDate = rentData.loanDate
      .toString()
      .split('-')
      .map(item => Number(item));

    const splitReturnDate = rentData.returnDate
      .toString()
      .split('-')
      .map(item => Number(item));

    const formattedRentData = {
      ...rentData,
      loanDate: new Date(splitloanDate[0], splitloanDate[1] - 1, splitloanDate[2]),
      returnDate: new Date(splitReturnDate[0], splitReturnDate[1] - 1, splitReturnDate[2]),
    };

    validateSchemaOrThrowAppError(LoanBookSchema, formattedRentData);

    const updatedBook = await this.bookRepository.createRentHistory({ id: bookData.id, ...formattedRentData });

    return updatedBook;
  }
}

export { LoanBookUseCase };
