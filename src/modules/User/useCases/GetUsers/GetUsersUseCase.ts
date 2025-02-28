import { UserRepository } from '../../infra/repositories/prisma/UserRepository';

class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<string[]> {
    const usersData = await this.userRepository.getUsers();
    const users = usersData.map(userdata => userdata.email);

    return users;
  }
}

export { GetUsersUseCase };
