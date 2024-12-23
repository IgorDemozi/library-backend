import { Request, Response } from 'express';
import { dirname } from 'path';

const _dirname = dirname('../');

class ImageUploadController {
  async handle(req: Request, res: Response): Promise<Response | void> {
    const { filename } = req.params;

    console.log('filename => ', filename);
    console.log('req.params => ', req.params);

    try {
      return res.sendFile(`./upload/${filename}`, {
        root: _dirname,
      });
    } catch (err) {
      return res.json(err);
    }
  }
}

export { ImageUploadController };
