import { Book } from '../../entities/Book';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';

class DeactivateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(id: string, description: string): Promise<Book> {
    const updateBook = await this.bookRepository.deactivateBook(id, description);
    return updateBook;
  }
}

export { DeactivateBookUseCase };
