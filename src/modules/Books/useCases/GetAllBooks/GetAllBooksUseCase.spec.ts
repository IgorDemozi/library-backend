import { BooksRepositoryInMemory } from '../../infra/in-memory/BooksRepositoryInMemory';
import { GetAllBooksUseCase } from './GetAllBooksUseCase';

const repository = new BooksRepositoryInMemory(true);
const useCase = new GetAllBooksUseCase(repository);

describe('GetAllBooksUseCase tests', () => {
  it('should set the isRented property to false', async () => {
    const output = await useCase.execute();
    expect(output.length).toBe(3);
  });
});
