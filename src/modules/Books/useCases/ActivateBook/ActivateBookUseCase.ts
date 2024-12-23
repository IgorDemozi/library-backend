import { Book } from '../../entities/Book';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';

class ActivateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(id: string): Promise<Book> {
    const updateBook = await this.bookRepository.activateBook(id);
    return updateBook;
  }
}

export { ActivateBookUseCase };
