import { Book } from '../../Books/entities/Book';

export interface IRentHistory {
  id: string;
  studentName: string;
  class: string;
  loanDate: Date;
  returnDate: Date;
  bookId: string;
  book: Book;
}

class RentHistory {
  id: string;
  studentName: string;
  class: string;
  loanDate: Date;
  returnDate: Date;
  bookId: string;
  book: Book;

  constructor(props: IRentHistory) {
    Object.assign(this, props);
  }
}

export { RentHistory };
