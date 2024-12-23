import { Router } from 'express';
import { AuthenticateController } from '../../../../modules/User/useCases/Authenticate/AuthenticateController';

const authenticateController = new AuthenticateController();
const userRoutes = Router();

userRoutes.post('/', authenticateController.handle);

export { userRoutes };
