import { z } from 'zod';
import { User } from '../../entities/User';
import { IUserRepository } from '../../infra/repositories/types/IUserRepositories';
import { AppError } from '../../../../shared/errors/AppError';
import { validateSchemaOrThrowAppError } from '../../../../shared/utils/validateSchemaOrThrowAppError';
import { CreateUserSchema } from '../../entities/validator/CreateUserSchema';

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: ISignInUserDTO): Promise<User> {
    validateSchemaOrThrowAppError(CreateUserSchema, { email, password });

    const user = await this.userRepository.createUser(email, password);

    if (!user) {
      throw new AppError('Erro ao criar usuário.');
    }

    return user;
  }
}

export { CreateUserUseCase };
