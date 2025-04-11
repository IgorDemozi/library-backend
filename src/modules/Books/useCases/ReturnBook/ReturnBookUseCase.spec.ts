import { AppError } from '../../../../shared/errors/AppError';
import { BooksRepositoryInMemory } from '../../infra/in-memory/BooksRepositoryInMemory';
import { ReturnBookUseCase } from './ReturnBookUseCase';

const repository = new BooksRepositoryInMemory(true);
const useCase = new ReturnBookUseCase(repository);

describe('ReturnBookUseCase tests', () => {
  it('should throw an error if book does not exist', async () => {
    try {
      await useCase.execute('wrongidfortesting');
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should set the isRented property to false', async () => {
    const output = await useCase.execute('testid123');
    if (output) expect(output.isRented).toBe(false);
  });
});
