import { AppError } from '../../../../shared/errors/AppError';
import { UserRepositoryInMemory } from '../../infra/repositories/in-memory/UserRepositoryInMemory';
import { UpdateUserUseCase } from './UpdateUserUseCase';

const userRepository = new UserRepositoryInMemory();
const useCase = new UpdateUserUseCase(userRepository);

describe('UpdateUserUseCase tests', () => {
  it('should create and update an user', async () => {
    const user1 = await userRepository.createUser('user1@test.com', 'test1234');
    expect(userRepository.users).toHaveLength(1);

    const updatedData = { email: 'user1@test.com', password: '12345678' };
    const updatedUser = await useCase.execute(updatedData);

    if (updatedUser) {
      const output = await useCase.execute(updatedUser);
      expect(output.password).toBe('12345678');
    }
  });

  it('should throw an error if user does not exist', async () => {
    const user3 = { email: 'user3@test.com', password: 'test1234' };

    if (user3) {
      try {
        await useCase.execute(user3);
        fail('it should throw an error');
      } catch (err) {
        expect(err).toBeInstanceOf(AppError);
      }
    }
  });

  it('should throw an error if the new password is invalid', async () => {
    const user = await userRepository.findByEmail('user2@test.com');

    if (user) {
      const updatedUser = {
        email: user.email,
        password: '1234',
      };

      try {
        await useCase.execute(updatedUser);
      } catch (err) {
        expect(err).toBeInstanceOf(AppError);
      }
    }
  });
});
