import { AppError } from '../../../../shared/errors/AppError';
import { validateSchemaOrThrowAppError } from '../../../../shared/utils/validateSchemaOrThrowAppError';
import { User } from '../../entities/User';
import { CreateUserSchema } from '../../entities/validator/CreateUserSchema';
import { IUserRepository } from '../../infra/repositories/types/IUserRepositories';

class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: ISignInUserDTO): Promise<User> {
    validateSchemaOrThrowAppError(CreateUserSchema, { email, password });

    const user = await this.userRepository.updateUser(email, password);

    if (!user) {
      throw new AppError('Usuário não existe.');
    }

    return user;
  }
}

export { UpdateUserUseCase };
