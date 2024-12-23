import { Book } from '../../entities/Book';
import { BookRepository } from '../../infra/repositories/prisma/BookRepository';

class GetBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(id: string): Promise<Book | null> {
    const book = await this.bookRepository.getBook(id);

    return book;
  }
}

export { GetBookUseCase };
