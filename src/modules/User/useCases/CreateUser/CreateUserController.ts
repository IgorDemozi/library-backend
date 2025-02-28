import { Request, Response } from 'express';
import { UserRepository } from '../../infra/repositories/prisma/UserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const usersRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    try {
      const newUser = await createUserUseCase.execute({
        email,
        password,
      });

      return res.json(newUser);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { CreateUserController };
