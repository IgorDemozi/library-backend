import { genres } from '../../../genres';

class GetGenresUseCase {
  async execute(): Promise<string[]> {
    return genres;
  }
}

export { GetGenresUseCase };
