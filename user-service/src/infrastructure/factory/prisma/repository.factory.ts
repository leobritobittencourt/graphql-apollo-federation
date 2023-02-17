import { RepositoryFactoryInterface } from '../../../domain/factory/repository.factory';
import { UserRepositoryInterface } from '../../../domain/repository/user.repository';
import { PrismaUserRepository } from '../../repository/prisma/user.repository';

export class PrismaRepositoryFactory implements RepositoryFactoryInterface {
  createUserRepository(): UserRepositoryInterface {
    return new PrismaUserRepository();
  }
}
