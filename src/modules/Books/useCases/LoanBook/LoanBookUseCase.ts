import { validateSchemaOrThrowAppError } from '../../../../shared/utils/validateSchemaOrThrowAppError';
import { RentHistory } from '../../../../types';
import { Book } from '../../entities/Book';
import { IBookRepository } from '../../infra/repositories/types/IBookRepository';
import { LoanBookSchema } from '../../validators/LoanBookSchema';

export interface LoanBookUseCaseProps {
  id: string;
  rentData: RentHistory;
}

class LoanBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(bookData: LoanBookUseCaseProps): Promise<Book | null> {
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
