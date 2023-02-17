import { RepositoryFactoryInterface } from '../../../domain/factory/repository.factory';
import { ProductRepositoryInterface } from '../../../domain/repository/product.repository';
import { PrismaProductRepository } from '../../repository/prisma/product.repository';

export class PrismaRepositoryFactory implements RepositoryFactoryInterface {
  createProductRepository(): ProductRepositoryInterface {
    return new PrismaProductRepository();
  }
}
