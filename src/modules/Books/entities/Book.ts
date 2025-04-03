interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  image: string;
  systemEntryDate: Date | string;
  synopsis: string;
  isRented: boolean;
  isActive: boolean;
  statusDescription: string;
  // rentHistory: RentHistory[];
}

type RentHistory = {
  studentName: string;
  class: string;
  loanDate: string;
  returnDate: string;
};

class Book {
  id?: string;
  title: string;
  author: string;
  genre: string;
  image: string;
  systemEntryDate: Date | string;
  synopsis: string;
  isRented?: boolean;
  isActive?: boolean;
  statusDescription?: string;
  rentHistory?: RentHistory[];

  constructor(props: IBook) {
    Object.assign(this, props);
  }
}

export { Book };
