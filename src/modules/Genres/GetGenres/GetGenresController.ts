import { Request, Response } from 'express';
import { GetGenresUseCase } from './GetGenresUseCase';

class GetGenresController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getGenresUseCase = new GetGenresUseCase();

    try {
      const genres = await getGenresUseCase.execute();
      return res.json(genres);
    } catch (err) {
      return res.json(err);
    }
  }
}
export { GetGenresController };
