import prisma from '../../../../../database/prismaClient';
import { ICreateRentHistoryDTO } from '../../../dtos/ICreateRentHistoryDTO';
import { Book } from '../../../entities/Book';
import { IBookRepository } from '../types/IBookRepository';

class BookRepository implements IBookRepository {
  async createBook(bookData: Book): Promise<Book> {
    const { author, genre, synopsis, systemEntryDate, title, image } = bookData;

    const yearMonthDay = systemEntryDate
      .toString()
      .split('-')
      .map(item => Number(item));

    const book = await prisma.book.create({
      data: {
        author,
        genre,
        synopsis,
        systemEntryDate: new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]),
        title,
        image,
      },
    });

    return book;
  }

  async updateBook(bookData: Book): Promise<Book> {
    const book = await prisma.book.findUnique({
      where: {
        id: bookData.id,
      },
    });

    const updatedBook = await prisma.book.update({
      where: {
        id: bookData.id,
      },
      data: {
        author: bookData.author || book?.author,
        genre: bookData.genre || book?.genre,
        synopsis: bookData.synopsis || book?.synopsis,
        systemEntryDate: bookData.systemEntryDate || book?.systemEntryDate,
        title: bookData.title || book?.title,
        image: bookData.image || book?.image,
      },
    });

    return updatedBook;
  }

  async getAllBooks(): Promise<Book[]> {
    const books = prisma.book.findMany({
      orderBy: {
        title: 'asc',
      },
    });

    return books;
  }

  async getBook(bookId: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    return book;
  }

  async createRentHistory(bookData: ICreateRentHistoryDTO): Promise<Book> {
    const updatedBook = await prisma.book.update({
      where: { id: bookData.id },
      data: {
        isRented: true,
        RentHistory: {
          create: {
            studentName: bookData.studentName,
            class: bookData.class,
            loanDate: bookData.loanDate,
            returnDate: bookData.returnDate,
          },
        },
      },
    });

    return updatedBook;
  }

  async returnBook(id: string): Promise<Book> {
    const updatedBook = await prisma.book.update({
      where: { id: id },
      data: {
        isRented: false,
      },
    });

    return updatedBook;
  }

  async activateBook(id: string): Promise<Book> {
    const updatedBook = await prisma.book.update({
      where: {
        id: id,
      },
      data: {
        statusDescription: 'ativo',
        isActive: true,
      },
    });

    return updatedBook;
  }

  async deactivateBook(id: string, description: string): Promise<Book> {
    const updatedBook = await prisma.book.update({
      where: {
        id: id,
      },
      data: {
        statusDescription: description,
        isActive: false,
      },
    });

    return updatedBook;
  }
}

export { BookRepository };
