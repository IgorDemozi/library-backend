import { GetGenresUseCase } from './GetGenresUseCase';

const useCase = new GetGenresUseCase();

describe('GetGenresUseCase tests', () => {
  it('should return an array with 8 items', async () => {
    const output = await useCase.execute();
    expect(output.length).toBe(8);
  });
});
