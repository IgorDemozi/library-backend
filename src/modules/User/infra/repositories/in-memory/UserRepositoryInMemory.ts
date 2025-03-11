import { User } from '../../../entities/User';
import { IUserRepository } from '../types/IUserRepositories';

export class UserRepositoryInMemory implements IUserRepository {
  public users: User[] = [];

  constructor(withSeeds?: boolean) {
    if (withSeeds) {
      this.users.push({
        email: 'usermail@user.com',
        password: 'user1234',
      });
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    return user ? { ...user } : null;
  }

  async createUser(email: string, password: string): Promise<User | null> {
    const user = new User({ email: email, password: password });

    this.users.push(user);
    return user;
  }

  async deleteUser(email: string): Promise<User | null> {
    const deletedUser = this.users.find(user => user.email === email);
    const index = this.users.findIndex(user => user.email === email);

    if (index !== -1) {
      this.users.splice(index, 1);
    }

    return deletedUser || null;
  }

  async updateUser(email: string, password: string): Promise<User | null> {
    const index = this.users.findIndex(user => user.email === email);

    if (index !== -1) {
      const user = this.users[index];

      const newUser = new User({
        email: email || user.email,
        password: password || user.password,
      });

      this.users[index] = { ...newUser };
      return newUser;
    }

    return null;
  }

  async getUsers(): Promise<User[]> {
    const users = this.users;

    return users;
  }
}
