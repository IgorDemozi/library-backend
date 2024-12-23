export interface IUpdateBookDTO {
  id: string;
  title: string;
  author: string;
  genre: string;
  img: string;
  systemEntryDate: string | Date;
  synopsis: string;
}
