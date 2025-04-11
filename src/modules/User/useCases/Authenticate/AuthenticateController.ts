import { Request, Response } from 'express';
import { UserRepository } from '../../infra/repositories/prisma/UserRepository';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const usersRepository = new UserRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

    try {
      const token = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return res.json(token);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { AuthenticateController };
