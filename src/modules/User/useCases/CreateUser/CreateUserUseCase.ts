import { z } from 'zod';
import { User } from '../../entities/User';
import { IUserRepository } from '../../infra/repositories/types/IUserRepositories';
import { AppError } from '../../../../shared/errors/AppError';

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: ISignInUserDTO): Promise<User> {
    const validation = z.object({
      email: z.string().email().min(1),
      password: z.string().min(1),
    });
    const validatedUser = validation.parse({
      email: email,
      password: password,
    });

    const user = await this.userRepository.createUser(validatedUser.email, validatedUser.password);

    if (!user) {
      throw new AppError('Erro ao criar usuário.');
    }

    return user;
  }
}

export { CreateUserUseCase };
