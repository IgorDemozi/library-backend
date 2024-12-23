import { Router } from 'express';
import { userRoutes } from './user.routes';
import { booksRoutes } from './books.routes';
import { rentHistoriesRoutes } from './rentHistories.routes';
import { imageUploadRoutes } from './imageUpload.routes';
import { genresRoutes } from './genres.routes';

const router = Router();

router.use('/login', userRoutes);
router.use('/books', booksRoutes);
router.use('/rentHistories', rentHistoriesRoutes);
router.use('/genres', genresRoutes);
// router.use('/upload', imageUploadRoutes);

export { router };
