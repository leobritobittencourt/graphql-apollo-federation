import { InputCreateUserDto } from '../../application/dto/create-user.dto';
import { CreateUserUseCase } from '../../application/use-case/create-user.use-case';
import { FindAllUsersUseCase } from '../../application/use-case/find-all-users.use-case';
import { FindOneUserByIdUseCase } from '../../application/use-case/find-one-user-by-id.use-case';
import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';

export class UserController {
  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {}

  async findAll() {
    const useCase = new FindAllUsersUseCase(this.repositoryFactory);
    return useCase.execute();
  }

  async findOneById(id: string) {
    const useCase = new FindOneUserByIdUseCase(this.repositoryFactory);
    return useCase.execute(id);
  }

  async create(data: InputCreateUserDto) {
    const useCase = new CreateUserUseCase(this.repositoryFactory);
    return await useCase.execute(data);
  }
}
