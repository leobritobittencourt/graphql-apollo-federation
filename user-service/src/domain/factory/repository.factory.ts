import { UserRepositoryInterface } from '../repository/user.repository';

export interface RepositoryFactoryInterface {
  createUserRepository(): UserRepositoryInterface;
}
