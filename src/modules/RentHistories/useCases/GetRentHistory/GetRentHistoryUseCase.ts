import { IGetRentHistoryDTO } from '../../dtos/IGetRentHistoryDTO';
import { RentHistoriesRepository } from '../../infra/repositories/prisma/RentHistoriesRepository';

class GetRentHistoryUseCase {
  constructor(private rentHistoriesRepository: RentHistoriesRepository) {}

  async execute(id: string): Promise<IGetRentHistoryDTO[] | null> {
    const rentHistory = await this.rentHistoriesRepository.getRentHistory(id);
    return rentHistory;
  }
}

export { GetRentHistoryUseCase };
