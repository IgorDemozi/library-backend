import { ICreateRentHistoryDTO } from '../../dtos/ICreateRentHistoryDTO';
import { Book } from '../../entities/Book';
import { IBookRepository } from '../repositories/types/IBookRepository';

export class BooksRepositoryInMemory implements IBookRepository {
  public books: Book[] = [];

  constructor(withSeeds?: boolean) {
    if (withSeeds) {
      this.books.push(
        {
          id: Date.now().toString(),
          title: 'duna',
          author: 'naosei',
          genre: 'ficção',
          image: 'img',
          systemEntryDate: '10/05/2024',
          synopsis: 'areia e minhoca',
          isRented: false,
          isActive: true,
          statusDescription: 'descrição',
        },
        {
          id: 'testid123',
          title: 'escaravelho dourado',
          author: 'aquele la',
          genre: 'suspense',
          image: 'img',
          systemEntryDate: '10/05/2024',
          synopsis: 'insetos e metais precisosos',
          isRented: true,
          isActive: true,
          statusDescription: 'descrição',
        },
        {
          id: Date.now().toString(),
          title: 'moby dick',
          author: 'sim',
          genre: 'fantasia',
          image: 'img',
          systemEntryDate: '10/05/2024',
          synopsis: 'mar e baleia',
          isRented: false,
          isActive: true,
          statusDescription: 'descrição',
        }
      );
    }
  }

  async createBook(book: Book): Promise<Book> {
    const yearMonthDay = book.systemEntryDate
      .toString()
      .split('-')
      .map(item => Number(item));

    const newBook = { ...book, systemEntryDate: new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]) };

    this.books.push(newBook);

    return newBook;
  }

  async updateBook(bookData: Book): Promise<Book | null> {
    const index = this.books.findIndex(book => book.id === bookData.id);

    const yearMonthDay = bookData.systemEntryDate
      .toString()
      .split('-')
      .map(item => Number(item));

    if (index !== -1) {
      const newBook = { ...bookData, systemEntryDate: new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]) };
      this.books[index] = newBook;

      return newBook;
    }

    return null;
  }

  async getAllBooks(): Promise<Book[]> {
    return this.books;
  }

  async getBook(bookId: string): Promise<Book | null> {
    const index = this.books.findIndex(book => book.id === bookId);

    if (index !== -1) return this.books[index];
    return null;
  }

  async activateBook(id: string): Promise<Book | null> {
    const index = this.books.findIndex(book => book.id === id);

    if (index !== -1) {
      const updatedBook: Book = { ...this.books[index], statusDescription: 'ativo', isActive: true };
      this.books[index] = updatedBook;
      return updatedBook;
    }

    return null;
  }

  async deactivateBook(id: string, description: string): Promise<Book | null> {
    const index = this.books.findIndex(book => book.id === id);

    if (index !== -1) {
      const updatedBook: Book = { ...this.books[index], statusDescription: description, isActive: false };
      this.books[index] = updatedBook;
      return updatedBook;
    }

    return null;
  }

  async returnBook(id: string): Promise<Book | null> {
    const index = this.books.findIndex(book => book.id === id);

    if (index !== -1) {
      const updatedBook: Book = { ...this.books[index], isRented: false };
      this.books[index] = updatedBook;
      return updatedBook;
    }

    return null;
  }

  async createRentHistory(bookData: ICreateRentHistoryDTO): Promise<Book | null> {
    const index = this.books.findIndex(book => book.id === bookData.id);
    const oldRentHistory = this.books[index].rentHistory;

    if (index !== -1 && oldRentHistory) {
      const updatedBook: Book = {
        ...this.books[index],
        isRented: true,
        rentHistory: [
          ...oldRentHistory,
          {
            ...bookData,
            loanDate: bookData.loanDate.toString(),
            returnDate: bookData.returnDate.toString(),
          },
        ],
      };
      this.books[index] = updatedBook;
      return updatedBook;
    } else if (index !== -1) {
      const updatedBook: Book = {
        ...this.books[index],
        isRented: true,
        rentHistory: [
          {
            ...bookData,
            loanDate: bookData.loanDate.toString(),
            returnDate: bookData.returnDate.toString(),
          },
        ],
      };
      this.books[index] = updatedBook;
      return updatedBook;
    }

    return null;
  }
}
