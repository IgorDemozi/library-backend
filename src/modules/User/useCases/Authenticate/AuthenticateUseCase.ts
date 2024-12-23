import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { SECRET_KEY } from '../../../../shared/infra/http/middleware/auth';
import { IUserRepository } from '../../infra/repositories/types/IUserRepositories';
import { AppError } from '../../../../shared/errors/AppError';

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
    const validacao = z.object({
      email: z.string().email().min(1),
      password: z.string().min(1),
    });
    const usuarioValidado = validacao.parse({
      email: email,
      password: password,
    });

    const user = await this.userRepository.findByEmail(usuarioValidado.email);

    if (!user || user.password !== usuarioValidado.password) {
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
