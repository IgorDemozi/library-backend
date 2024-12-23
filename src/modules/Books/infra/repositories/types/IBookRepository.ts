import { ICreateRentHistoryDTO } from '../../../dtos/ICreateRentHistoryDTO';
import { Book } from '../../../entities/Book';

interface IBookRepository {
  createBook(book: Book): Promise<Book>;
  updateBook(bookData: Book): Promise<Book>;
  getAllBooks(): Promise<Book[]>;
  getBook(bookId: string): Promise<Book | null>;
  createRentHistory(bookData: ICreateRentHistoryDTO): Promise<Book>;
  returnBook(id: string): Promise<Book>;
  activateBook(id: string): Promise<Book>;
  deactivateBook(id: string, description: string): Promise<Book>;
}

export { IBookRepository };
