import { IGetAllRentHistoriesDTO } from '../../../dtos/IGetAllRentHistoriesDTO';
import { IGetRentHistoryDTO } from '../../../dtos/IGetRentHistoryDTO';

interface IRentHistoriesRepository {
  getAllRentHistories(): Promise<IGetAllRentHistoriesDTO[] | null>;
  getRentHistory(id: string): Promise<IGetRentHistoryDTO[] | null>;
}

export { IRentHistoriesRepository };
