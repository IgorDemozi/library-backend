import { RentHistoriesRepositoryInMemory } from '../../infra/repositories/in-memory/RentHistoriesRepositoryInMemory';
import { GetAllRentHistoriesUseCase } from './GetAllRentHistoriesUseCase';

const repository = new RentHistoriesRepositoryInMemory(true);
const useCase = new GetAllRentHistoriesUseCase(repository);

describe('GetAllRentHistoriesUseCase tests', () => {
  it('should return all rent histories', async () => {
    const output = await useCase.execute();
    expect(output).toHaveLength(3);
  });
});
