import { Router } from 'express';
import { GetGenresController } from '../../../../modules/Genres/GetGenres/GetGenresController';
import { auth } from '../middleware/auth';

const genresRoutes = Router();
const getGenresController = new GetGenresController();

genresRoutes.use(auth);

genresRoutes.get('/', getGenresController.handle);

export { genresRoutes };
