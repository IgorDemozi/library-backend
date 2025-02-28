import { Request, Response } from 'express';
import { UserRepository } from '../../infra/repositories/prisma/UserRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const usersRepository = new UserRepository();
    const updateUserUseCase = new UpdateUserUseCase(usersRepository);

    try {
      const updatedUser = await updateUserUseCase.execute({
        email,
        password,
      });

      return res.json(updatedUser);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { UpdateUserController };
