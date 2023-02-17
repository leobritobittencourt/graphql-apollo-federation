import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { UserRepositoryInterface } from '../../domain/repository/user.repository';
import { OutputFindAllUsersDto } from '../dto/find-all-users.dto';

export class FindAllUsersUseCase {
  private readonly userRepository: UserRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(): Promise<OutputFindAllUsersDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => new OutputFindAllUsersDto(user));
  }
}
