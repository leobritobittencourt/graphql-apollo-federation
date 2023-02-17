import { ProductRepositoryInterface } from '../repository/product.repository';

export interface RepositoryFactoryInterface {
  createProductRepository(): ProductRepositoryInterface;
}
