import { ICreateRentHistoryDTO } from '../../../dtos/ICreateRentHistoryDTO';
import { Book } from '../../../entities/Book';

interface IBookRepository {
  createBook(book: Book): Promise<Book>;
  updateBook(bookData: Book): Promise<Book | null>;
  getAllBooks(): Promise<Book[]>;
  getBook(bookId: string): Promise<Book | null>;
  createRentHistory(bookData: ICreateRentHistoryDTO): Promise<Book | null>;
  returnBook(id: string): Promise<Book | null>;
  activateBook(id: string): Promise<Book | null>;
  deactivateBook(id: string, description: string): Promise<Book | null>;
}

export { IBookRepository };
