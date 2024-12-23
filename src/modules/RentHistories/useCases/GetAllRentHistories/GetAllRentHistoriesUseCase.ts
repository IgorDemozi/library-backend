import { IGetAllRentHistoriesDTO } from '../../dtos/IGetAllRentHistoriesDTO';
import { RentHistoriesRepository } from '../../infra/repositories/prisma/RentHistoriesRepository';

class GetAllRentHistoriesUseCase {
  constructor(private rentHistoriesRepository: RentHistoriesRepository) {}

  async execute(): Promise<IGetAllRentHistoriesDTO[] | null> {
    const rentHistories = await this.rentHistoriesRepository.getAllRentHistories();
    return rentHistories;
  }
}
export { GetAllRentHistoriesUseCase };
