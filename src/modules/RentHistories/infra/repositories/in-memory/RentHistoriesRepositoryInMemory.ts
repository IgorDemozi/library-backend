import { format } from 'date-fns';
import { IGetAllRentHistoriesDTO } from '../../../dtos/IGetAllRentHistoriesDTO';
import { IGetRentHistoryDTO } from '../../../dtos/IGetRentHistoryDTO';
import { IRentHistory } from '../../../entities/RentHistory';
import { IRentHistoriesRepository } from '../types/IRentHistoriesRepositories';

export class RentHistoriesRepositoryInMemory implements IRentHistoriesRepository {
  public rentHistories: IRentHistory[] = [];

  private book = {
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
  };

  constructor(withSeeds?: boolean) {
    if (withSeeds) {
      const loanDate = new Date();

      const returnDate1 = new Date();
      returnDate1.setDate(loanDate.getDate() + 7);

      this.rentHistories.push(
        {
          id: Date.now().toString(),
          book: this.book,
          bookId: this.book.id,
          class: 'turma 402',
          loanDate: loanDate,
          returnDate: returnDate1,
          studentName: 'rogerinho',
        },
        {
          id: 'testid123',
          book: this.book,
          bookId: this.book.id,
          class: 'turma 205',
          loanDate: loanDate,
          returnDate: returnDate1,
          studentName: 'zezinho',
        },
        {
          id: Date.now().toString(),
          book: this.book,
          bookId: this.book.id,
          class: 'turma 47',
          loanDate: loanDate,
          returnDate: returnDate1,
          studentName: 'pudim',
        }
      );
    }
  }

  async getAllRentHistories(): Promise<IGetAllRentHistoriesDTO[] | null> {
    const allRentHistories = this.rentHistories.map(rentHistory => {
      return {
        title: rentHistory.book.title,
        studentName: rentHistory.studentName,
        class: rentHistory.class,
        loanDate: format(new Date(rentHistory.loanDate), 'dd/MM/yyyy'),
        returnDate: format(new Date(rentHistory.returnDate), 'dd/MM/yyyy'),
      };
    });
    return allRentHistories;
  }

  async getRentHistory(id: string): Promise<IGetRentHistoryDTO[] | null> {
    const rentHistory = this.rentHistories.find(item => item.id === id);

    if (rentHistory) {
      return [
        {
          studentName: rentHistory.studentName,
          class: rentHistory.class,
          loanDate: format(new Date(rentHistory.loanDate), 'dd/MM/yyyy'),
          returnDate: format(new Date(rentHistory.returnDate), 'dd/MM/yyyy'),
        },
      ];
    } else {
      return null;
    }
  }
}
