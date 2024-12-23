import { Request, Response } from 'express';
import { RentHistoriesRepository } from '../../infra/repositories/prisma/RentHistoriesRepository';
import { GetAllRentHistoriesUseCase } from './GetAllRentHistoriesUseCase';

class GetAllRentHistoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const rentHistoriesRepository = new RentHistoriesRepository();
    const getAllRentHistoriesUseCase = new GetAllRentHistoriesUseCase(rentHistoriesRepository);

    try {
      const rentHistories = await getAllRentHistoriesUseCase.execute();

      if (!rentHistories || rentHistories.length < 1) {
        return res.status(404).json({ error: 'Nenhum histórico encontrado' });
      }

      return res.status(201).json(rentHistories);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { GetAllRentHistoriesController };
