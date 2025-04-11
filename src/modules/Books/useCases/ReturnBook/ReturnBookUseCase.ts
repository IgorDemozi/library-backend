import { Book } from '../../entities/Book';
import { IBookRepository } from '../../infra/repositories/types/IBookRepository';

class ReturnBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(id: string): Promise<Book | null> {
    const updatedBook = await this.bookRepository.returnBook(id);
    return updatedBook;
  }
}

export { ReturnBookUseCase };
