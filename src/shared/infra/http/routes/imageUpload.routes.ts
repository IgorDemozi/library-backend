import { Router } from 'express';
import { ImageUploadController } from '../../../../modules/ImageUpload/useCase/ImageUploadController';
import { auth } from '../middleware/auth';

const imageUploadRoutes = Router();
const imageUploadController = new ImageUploadController();

imageUploadRoutes.use(auth);

imageUploadRoutes.get('/:filename', imageUploadController.handle);

export { imageUploadRoutes };
