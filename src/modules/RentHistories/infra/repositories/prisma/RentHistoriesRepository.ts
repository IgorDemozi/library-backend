import moment from 'moment';
import prisma from '../../../../../database/prismaClient';
import { IGetAllRentHistoriesDTO } from '../../../dtos/IGetAllRentHistoriesDTO';
import { IGetRentHistoryDTO } from '../../../dtos/IGetRentHistoryDTO';
import { IRentHistoriesRepository } from '../types/IRentHistoriesRepositories';

class RentHistoriesRepository implements IRentHistoriesRepository {
  async getAllRentHistories(): Promise<IGetAllRentHistoriesDTO[] | null> {
    const rentHistories = await prisma.rentHistory.findMany({
      include: {
        book: { select: { title: true } },
      },
    });

    const formattedRentHistories = rentHistories.map(rentHistory => {
      return {
        title: rentHistory.book.title,
        studentName: rentHistory.studentName,
        class: rentHistory.class,
        loanDate: moment(new Date(rentHistory.loanDate)).format('DD/MM/YYYY'),
        returnDate: moment(new Date(rentHistory.returnDate)).format('DD/MM/YYYY'),
      };
    });

    return formattedRentHistories;
  }

  async getRentHistory(id: string): Promise<IGetRentHistoryDTO[] | null> {
    const rentHistory = await prisma.rentHistory.findMany({
      where: {
        bookId: id,
      },
    });

    const formattedRentHistory = rentHistory.map(item => {
      return {
        studentName: item.studentName,
        class: item.class,
        loanDate: moment(new Date(item.loanDate)).format('DD/MM/YYYY'),
        returnDate: moment(new Date(item.returnDate)).format('DD/MM/YYYY'),
      };
    });

    return formattedRentHistory;
  }
}

export { RentHistoriesRepository };
