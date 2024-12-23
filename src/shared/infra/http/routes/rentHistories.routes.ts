import { Router } from 'express';
import { auth } from '../middleware/auth';
import { GetAllRentHistoriesController } from '../../../../modules/RentHistories/useCases/GetAllRentHistories/GetAllRentHistoriesController';
import { GetRentHistoryController } from '../../../../modules/RentHistories/useCases/GetRentHistory/GetRentHistoryController';

const rentHistoriesRoutes = Router();
const getAllRentHistoriesController = new GetAllRentHistoriesController();
const getRentHistoryController = new GetRentHistoryController();

rentHistoriesRoutes.use(auth);

rentHistoriesRoutes.get('/', getAllRentHistoriesController.handle);
rentHistoriesRoutes.get('/:id', getRentHistoryController.handle);

export { rentHistoriesRoutes };
