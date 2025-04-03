import { AppError } from '../../../../shared/errors/AppError';
import { BooksRepositoryInMemory } from '../../infra/in-memory/BooksRepositoryInMemory';
import { UpdateBookUseCase } from './UpdateBookUseCase';

const repository = new BooksRepositoryInMemory(true);
const useCase = new UpdateBookUseCase(repository);

describe('UpdateBoofUseCase tests', () => {
  it('should throw an error if book does not exist', async () => {
    const newData = {
      id: 'wrongidfortesting',
      title: 'escaravelho dourado',
      author: 'aquele la',
      genre: 'suspense',
      img: 'img',
      systemEntryDate: '10/05/2024',
      synopsis: 'insetos e metais precisosos',
      isRented: false,
      isActive: true,
      statusDescription: 'descrição',
    };

    try {
      await useCase.execute(newData);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
