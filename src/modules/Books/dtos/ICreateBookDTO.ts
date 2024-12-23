export interface ICreateBookDTO {
  title: string;
  author: string;
  genre: string;
  img: Express.Multer.File | undefined;
  systemEntryDate: string;
  synopsis: string;
}
