import { AppError } from '../../../../shared/errors/AppError';
import { UserRepositoryInMemory } from '../../infra/repositories/in-memory/UserRepositoryInMemory';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const repository = new UserRepositoryInMemory();
const useCase = new DeleteUserUseCase(repository);

describe('DeleteUserUseCase tests', () => {
  it('should create and delete an user', async () => {
    const user1 = await repository.createUser('user1@test.com', 'test1234');
    expect(repository.users).toHaveLength(1);

    if (user1) {
      const deletedUser = await useCase.execute(user1.email);

      if (deletedUser) {
        expect(deletedUser.email).toBe(user1.email);
      }
    }
  });

  it('should throw an error if user does not exist', async () => {
    const user3 = 'user3@test.com';

    try {
      await useCase.execute(user3);
      fail('it should throw an error');
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
