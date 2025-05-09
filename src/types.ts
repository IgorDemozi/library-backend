export interface Livro {
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
}

export type RentHistory = {
  id?: string;
  studentName: string;
  class: string;
  loanDate: string;
  returnDate: string;
};

export type Status = {
  isRented: boolean;
  isActive: boolean;
  description: string;
};
