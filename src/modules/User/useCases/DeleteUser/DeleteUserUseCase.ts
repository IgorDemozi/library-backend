import { AppError } from '../../../../shared/errors/AppError';
import { IUserRepository } from '../../infra/repositories/types/IUserRepositories';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    return await this.userRepository.deleteUser(email);
  }
}
