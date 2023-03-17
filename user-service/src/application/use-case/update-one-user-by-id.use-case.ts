import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { UserRepositoryInterface } from '../../domain/repository/user.repository';
import { OutputCreateUserDto } from '../dto/create-user.dto';
import { InputUpdateOneUserByIdDto } from '../dto/update-one-user-by-id.dto';

export class UpdateOneUserByIdUseCase {
  private readonly userRepository: UserRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(id: string, data: InputUpdateOneUserByIdDto): Promise<OutputCreateUserDto> {
    const result = await this.userRepository.updateOneById(id, data);
    return new OutputCreateUserDto(result);
  }
}
