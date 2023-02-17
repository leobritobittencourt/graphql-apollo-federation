import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { UserRepositoryInterface } from '../../domain/repository/user.repository';
import { OutputFindOneUserByIdDto } from '../dto/find-one-user-by-id.dto';

export class FindOneUserByIdUseCase {
  private readonly userRepository: UserRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(id: string): Promise<OutputFindOneUserByIdDto> {
    const user = await this.userRepository.findOneById(id);
    return new OutputFindOneUserByIdDto(user);
  }
}
