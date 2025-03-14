import { AppError } from '../../../../shared/errors/AppError';
import { UserRepositoryInMemory } from '../../infra/repositories/in-memory/UserRepositoryInMemory';
import { AuthenticateUserUseCase } from './AuthenticateUseCase';

const repository = new UserRepositoryInMemory();
const useCase = new AuthenticateUserUseCase(repository);

describe('AuthenticateUserUseCase tests', () => {
  it('should create a new user and log in with it', async () => {
    const user1 = await repository.createUser('user1@test.com', 'test1234');
    expect(repository.users).toHaveLength(1);

    if (user1) {
      const response = await useCase.execute(user1);
      expect(response.auth).toBe(true);
    }
  });

  it('should throw an error if the password is shorter than 8 characters', async () => {
    const user1 = { email: 'user1@test.com', password: '123456' };

    try {
      await useCase.execute(user1);
      fail('it should throw an error');
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should throw an error if the email is incorrect', async () => {
    const user2 = { email: 'user2@test.com', password: '12345678' };

    try {
      await useCase.execute(user2);
      fail('it should throw an error');
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should throw an error if the password is incorrect', async () => {
    const user1 = { email: 'user1@test.com', password: '12345678' };

    try {
      await useCase.execute(user1);
      fail('it should throw an error');
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
