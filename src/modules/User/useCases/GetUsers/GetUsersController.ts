import { UserRepository } from '../../infra/repositories/prisma/UserRepository';
import { Request, Response } from 'express';
import { GetUsersUseCase } from './GetUsersUseCase';

class GetUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const usersRepository = new UserRepository();
    const getUsersUseCase = new GetUsersUseCase(usersRepository);

    try {
      const users = await getUsersUseCase.execute();
      return res.status(201).json(users);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { GetUsersController };
