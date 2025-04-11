import { Book } from '../../entities/Book';
import { IBookRepository } from '../../infra/repositories/types/IBookRepository';

class ActivateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(id: string): Promise<Book | null> {
    const updateBook = await this.bookRepository.activateBook(id);
    return updateBook;
  }
}

export { ActivateBookUseCase };
