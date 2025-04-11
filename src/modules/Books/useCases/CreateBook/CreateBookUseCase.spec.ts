import { AppError } from '../../../../shared/errors/AppError';
import { BooksRepositoryInMemory } from '../../infra/in-memory/BooksRepositoryInMemory';
import { CreateBookUseCase } from './CreateBookUseCase';

const repository = new BooksRepositoryInMemory();
const useCase = new CreateBookUseCase(repository);

describe('ReturnBookUseCase tests', () => {
  it('should throw an error if book is missing info', async () => {
    const newBook = {
      title: 'moby dick',
      author: 'aaa',
      genre: 'fantasia',
      img: undefined,
      systemEntryDate: '10/05/2024',
      synopsis: 'aaa',
    };

    try {
      await useCase.execute(newBook);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should create a new book successfully', async () => {
    const newBook = {
      title: 'moby dick',
      author: 'sim',
      genre: 'fantasia',
      img: {
        filename: 'aaaaaa',
      } as Express.Multer.File,
      systemEntryDate: '10/05/2024',
      synopsis: 'mar e baleia',
    };

    const output = await useCase.execute(newBook);
    expect(output).toBeTruthy();
  });
});
