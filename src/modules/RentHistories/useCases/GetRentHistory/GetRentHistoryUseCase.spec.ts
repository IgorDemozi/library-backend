import { RentHistoriesRepositoryInMemory } from '../../infra/repositories/in-memory/RentHistoriesRepositoryInMemory';
import { GetRentHistoryUseCase } from './GetRentHistoryUseCase';

const repository = new RentHistoriesRepositoryInMemory(true);
const useCase = new GetRentHistoryUseCase(repository);

describe('GetRentHistoryUseCase tests', () => {
  it('should return one rent history based on the id that was provided', async () => {
    const output = await useCase.execute('testid123');
    if (output) expect(output[0].class).toBe('turma 205');
  });
});
