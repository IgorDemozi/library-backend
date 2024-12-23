import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { dirname } from 'path';
import { router } from './routes';

const _dirname = dirname('../');

const port = 3000;
const app = express();

app.use('./upload', express.static('upload'));
app.use(cors());
app.use(express.json());

app.use(router);

// trazer imagem
app.get('/upload/:filename', (req, res) => {
  return res.sendFile(`./upload/${req.params.filename}`, {
    root: _dirname,
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500);
  res.send({ message: err.message });
});

app.listen(port, async () => {
  console.log(`Servidor executado no port ${port}`);
});
