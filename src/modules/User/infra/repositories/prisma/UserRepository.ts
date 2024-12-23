import prisma from '../../../../../database/prismaClient';
import { User } from '../../../entities/User';
import { IUserRepository } from '../types/IUserRepositories';

class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}

export { UserRepository };
