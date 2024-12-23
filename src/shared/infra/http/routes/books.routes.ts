import { Router } from 'express';
import { ActivateBookController } from '../../../../modules/Books/useCases/ActivateBook/ActivateBookController';
import { CreateBookController } from '../../../../modules/Books/useCases/CreateBook/CreateBookController';
import { DeactivateBookController } from '../../../../modules/Books/useCases/DeactivateBook/DeactivateBookController';
import { GetAllBooksController } from '../../../../modules/Books/useCases/GetAllBooks/GetAllBooksController';
import { GetBookController } from '../../../../modules/Books/useCases/GetBook/GetBookController';
import { LoanBookController } from '../../../../modules/Books/useCases/LoanBook/LoanBookController';
import { ReturnBookController } from '../../../../modules/Books/useCases/ReturnBook/ReturnBookController';
import { UpdateBookController } from '../../../../modules/Books/useCases/UpdateBook/UpdateBookController';
import { auth } from '../middleware/auth';
import { uploadArrayFileMiddleware, uploadSingleFileMiddleware } from '../middleware/uploadFile';

const booksRoutes = Router();
const createBookController = new CreateBookController();
const getAllBooksController = new GetAllBooksController();
const getBookController = new GetBookController();
const loanBook = new LoanBookController();
const returnBook = new ReturnBookController();
const updateBook = new UpdateBookController();
const activateBook = new ActivateBookController();
const deactivateBook = new DeactivateBookController();

booksRoutes.use(auth);

booksRoutes.post('/', uploadSingleFileMiddleware, createBookController.handle);
booksRoutes.post('/mobilePostBook', uploadArrayFileMiddleware, createBookController.handle);
booksRoutes.get('/', getAllBooksController.handle);
booksRoutes.get('/:id', getBookController.handle);
booksRoutes.patch('/loan/:id', loanBook.handle);
booksRoutes.patch('/return/:id', returnBook.handle);
booksRoutes.patch('/:id', uploadSingleFileMiddleware, updateBook.handle);
booksRoutes.patch('/activate/:id', activateBook.handle);
booksRoutes.patch('/deactivate/:id', deactivateBook.handle);

export { booksRoutes };
