import { User } from '../../../entities/User';

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(email: string, password: string): Promise<User | null>;
  updateUser(email: string, password: string): Promise<User | null>;
  deleteUser(email: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
}

export { IUserRepository };
