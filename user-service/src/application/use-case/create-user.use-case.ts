import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { UserRepositoryInterface } from '../../domain/repository/user.repository';
import { InputCreateUserDto, OutputCreateUserDto } from '../dto/create-user.dto';

export class CreateUserUseCase {
  private readonly userRepository: UserRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(data: InputCreateUserDto): Promise<OutputCreateUserDto> {
    const result = await this.userRepository.createOne(data);
    return new OutputCreateUserDto(result);
  }
}
