import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { ProductRepositoryInterface } from '../../domain/repository/product.repository';
import { OutputFindAllProductsDto } from '../dto/find-all-products.dto';

export class FindAllProductsUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.productRepository = this.repositoryFactory.createProductRepository();
  }

  async execute(): Promise<OutputFindAllProductsDto[]> {
    const products = await this.productRepository.findAll();
    return products.map((user) => new OutputFindAllProductsDto(user));
  }
}
