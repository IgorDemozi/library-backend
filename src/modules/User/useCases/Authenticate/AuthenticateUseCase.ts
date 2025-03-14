import jwt from 'jsonwebtoken';
import { AppError } from '../../../../shared/errors/AppError';
import { SECRET_KEY } from '../../../../shared/infra/http/middleware/auth';
import { validateSchemaOrThrowAppError } from '../../../../shared/utils/validateSchemaOrThrowAppError';
import { CreateUserSchema } from '../../entities/validator/CreateUserSchema';
import { IUserRepository } from '../../infra/repositories/types/IUserRepositories';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  auth: boolean;
  token: string;
}

class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    validateSchemaOrThrowAppError(CreateUserSchema, { email, password });

    const user = await this.userRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new AppError('Usuário ou senha inválidos');
    }

    const token = jwt.sign({ id: user.email.toString() }, SECRET_KEY, {
      expiresIn: '1h',
    });

    const response = { auth: true, token: token };

    return response;
  }
}

export { AuthenticateUserUseCase };
