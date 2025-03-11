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

  async createUser(email: string, password: string): Promise<User | null> {
    return await prisma.user.create({ data: { email: email, password: password } });
  }

  async deleteUser(email: string): Promise<User | null> {
    return await prisma.user.delete({
      where: {
        email,
      },
    });
  }

  async updateUser(email: string, password: string): Promise<User | null> {
    return await prisma.user.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    const users = prisma.user.findMany({
      orderBy: {
        email: 'asc',
      },
    });

    return users;
  }
}

export { UserRepository };
