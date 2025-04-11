import { Book } from '../../entities/Book';
import { IBookRepository } from '../../infra/repositories/types/IBookRepository';

class GetAllBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(): Promise<Book[]> {
    const books = await this.bookRepository.getAllBooks();
    return books;
  }
}

export { GetAllBooksUseCase };
