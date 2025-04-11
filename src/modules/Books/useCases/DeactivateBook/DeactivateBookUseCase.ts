import { Book } from '../../entities/Book';
import { IBookRepository } from '../../infra/repositories/types/IBookRepository';

class DeactivateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(id: string, description: string): Promise<Book | null> {
    const updateBook = await this.bookRepository.deactivateBook(id, description);
    if (updateBook) return updateBook;
    return null;
  }
}

export { DeactivateBookUseCase };
