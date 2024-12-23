import { User } from '../../../entities/User';

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
}

export { IUserRepository };
