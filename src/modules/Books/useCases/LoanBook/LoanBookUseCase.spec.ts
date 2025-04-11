import { AppError } from '../../../../shared/errors/AppError';
import { BooksRepositoryInMemory } from '../../infra/in-memory/BooksRepositoryInMemory';
import { LoanBookUseCase, LoanBookUseCaseProps } from './LoanBookUseCase';

const repository = new BooksRepositoryInMemory(true);
const useCase = new LoanBookUseCase(repository);

describe('LoanBookUseCase tests', () => {
  it('should throw an error if book does not exist', async () => {
    const newData: LoanBookUseCaseProps = {
      id: 'wrongidfortesting',
      rentData: {
        class: 'turma 402',
        loanDate: 'loanDate',
        returnDate: 'returnDate',
        studentName: 'rogerinho',
      },
    };

    try {
      await useCase.execute(newData);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should loan the book, creating a new rent history', async () => {
    const newData: LoanBookUseCaseProps = {
      id: 'testid123',
      rentData: {
        class: 'turma 402',
        loanDate: '2025-04-15',
        returnDate: '2025-04-20',
        studentName: 'rogerinho',
      },
    };

    const output = await useCase.execute(newData);
    console.log('output => ', output);

    expect(output).toBeTruthy();
  });
});
