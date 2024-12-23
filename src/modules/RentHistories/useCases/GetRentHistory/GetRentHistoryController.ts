import { Request, Response } from 'express';
import { RentHistoriesRepository } from '../../infra/repositories/prisma/RentHistoriesRepository';
import { GetRentHistoryUseCase } from './GetRentHistoryUseCase';

class GetRentHistoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const rentHistoriesRepository = new RentHistoriesRepository();
    const getRentHistoryUseCase = new GetRentHistoryUseCase(rentHistoriesRepository);

    try {
      const rentHistory = await getRentHistoryUseCase.execute(id);

      if (!rentHistory || rentHistory.length < 1) {
        return res.status(404).json({ error: 'Nenhum histórico encontrado' });
      }

      return res.status(201).json(rentHistory);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { GetRentHistoryController };
