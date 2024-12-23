import { Book } from '../../entities/Book';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';

class GetAllBooksUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(): Promise<Book[]> {
    const books = await this.bookRepository.getAllBooks();
    return books;
  }
}

export { GetAllBooksUseCase };
