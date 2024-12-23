import { Book } from '../../entities/Book';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';

class ReturnBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(id: string): Promise<Book> {
    const updatedBook = await this.bookRepository.returnBook(id);
    return updatedBook;
  }
}

export { ReturnBookUseCase };
