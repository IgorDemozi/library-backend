import { AppError } from '../../../../shared/errors/AppError';
import { UserRepositoryInMemory } from '../../infra/repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';

const userRepository = new UserRepositoryInMemory();
const useCase = new CreateUserUseCase(userRepository);

describe('CreateUserUseCase tests', () => {
  it('should create an user', async () => {
    const userData = { email: 'testMail@test.com', password: 'test1234' };

    const user = await useCase.execute(userData);
    expect(user).toBeTruthy();
  });

  it('should throw an error if the password is shorter than 8 characters', async () => {
    const userData = { email: 'testMail@test.com', password: 'test123' };

    try {
      await useCase.execute(userData);
      fail('should throw an error');
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
