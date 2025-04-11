import { AppError } from '../../../../shared/errors/AppError';
import { BooksRepositoryInMemory } from '../../infra/in-memory/BooksRepositoryInMemory';
import { DeactivateBookUseCase } from './DeactivateBookUseCase';

const repository = new BooksRepositoryInMemory(true);
const useCase = new DeactivateBookUseCase(repository);

describe('DeactivateBookUseCase tests', () => {
  it('should throw an error if book does not exist', async () => {
    try {
      await useCase.execute('wrongidfortesting', 'descrip');
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should set the isActive property to false and description to "new description"', async () => {
    const output = await useCase.execute('testid123', 'new description');
    if (output) {
      expect(output.isActive).toBe(false);
      expect(output.statusDescription).toBe('new description');
    }
  });
});
