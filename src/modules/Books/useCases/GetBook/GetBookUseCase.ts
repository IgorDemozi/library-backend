import { Book } from '../../entities/Book';
import { IBookRepository } from '../../infra/repositories/types/IBookRepository';

class GetBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(id: string): Promise<Book | null> {
    const book = await this.bookRepository.getBook(id);

    return book;
  }
}

export { GetBookUseCase };
