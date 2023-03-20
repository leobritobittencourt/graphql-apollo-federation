import { RepositoryFactoryInterface } from '../../../domain/factory/repository.factory';
import { UserRepositoryInterface } from '../../../domain/repository/user.repository';
import { MemoryUserRepository } from '../../repository/memory/user.repository';

export class MemoryRepositoryFactory implements RepositoryFactoryInterface {
  createUserRepository(): UserRepositoryInterface {
    return new MemoryUserRepository();
  }
}
