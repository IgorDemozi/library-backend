import { UserRepositoryInMemory } from '../../infra/repositories/in-memory/UserRepositoryInMemory';
import { GetUsersUseCase } from './GetUsersUseCase';

const userRepository = new UserRepositoryInMemory();
const useCase = new GetUsersUseCase(userRepository);

describe('GetUsersUseCase tests', () => {
  it('should create five users for tests', async () => {
    const user1 = await userRepository.createUser('user1@test.com', 'test1234');
    const user2 = await userRepository.createUser('user2@test.com', 'test1234');
    const user3 = await userRepository.createUser('user3@test.com', 'test1234');
    const user4 = await userRepository.createUser('user4@test.com', 'test1234');
    const user5 = await userRepository.createUser('user5@test.com', 'test1234');

    expect(userRepository.users).toHaveLength(5);
  });

  it('should return all users without password', async () => {
    const output = await useCase.execute();
    expect(output).toHaveLength(5);
    expect(output[0]).not.toHaveProperty('password');
  });
});
