import { Request, Response } from 'express';
import { UserRepository } from '../../infra/repositories/prisma/UserRepository';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const email = req.params.email;

    const usersRepository = new UserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

    try {
      await deleteUserUseCase.execute(email);
      return res.json('User deleted');
    } catch (err) {
      return res.json(err);
    }
  }
}

export { DeleteUserController };
