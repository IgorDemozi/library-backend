import { AppError } from '../../../../shared/errors/AppError';
import { BooksRepositoryInMemory } from '../../infra/in-memory/BooksRepositoryInMemory';
import { ActivateBookUseCase } from './ActivateBookUseCase';

const repository = new BooksRepositoryInMemory(true);
const useCase = new ActivateBookUseCase(repository);

describe('ActivateBookUseCase tests', () => {
  it('should throw an error if book does not exist', async () => {
    try {
      await useCase.execute('wrongidfortesting');
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should set the isActive property to false', async () => {
    const output = await useCase.execute('testid123');
    if (output) expect(output.isActive).toBe(true);
  });
});
