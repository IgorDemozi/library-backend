import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { dirname, join } from 'path';

// const _dirname = dirname('../../../../../');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'upload/');
    // callBack(null, join(_dirname, './upload/'));
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
    // callBack(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  // limits: {
  //   fieldSize: 10 * 1024 * 1024,
  // },
});

export const uploadSingleFileMiddleware = (req: Request, res: Response, next: NextFunction) =>
  upload.single('image')(req, res, next);

export const uploadArrayFileMiddleware = (req: Request, res: Response, next: NextFunction) =>
  upload.array('image', 1)(req, res, next);
