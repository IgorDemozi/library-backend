import { genres } from '../../../genres';

export class GetGenresUseCase {
  async execute(): Promise<string[]> {
    return genres;
  }
}
