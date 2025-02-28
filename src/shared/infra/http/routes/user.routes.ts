import { Router } from 'express';
import { AuthenticateController } from '../../../../modules/User/useCases/Authenticate/AuthenticateController';
import { CreateUserController } from '../../../../modules/User/useCases/CreateUser/CreateUserController';
import { DeleteUserController } from '../../../../modules/User/useCases/DeleteUser/DeleteUserController';
import { GetUsersController } from '../../../../modules/User/useCases/GetUsers/GetUsersController';
import { auth } from '../middleware/auth';
import { UpdateUserController } from '../../../../modules/User/useCases/UpdateUser/UpdateUserController';

const authenticateController = new AuthenticateController();
const createUserController = new CreateUserController();
const getUsersController = new GetUsersController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const userRoutes = Router();

userRoutes.get('/', auth, getUsersController.handle);
userRoutes.post('/login', authenticateController.handle);
userRoutes.post('/create', auth, createUserController.handle);
userRoutes.patch('/update', auth, updateUserController.handle);
userRoutes.delete('/delete/:email', auth, deleteUserController.handle);

export { userRoutes };
