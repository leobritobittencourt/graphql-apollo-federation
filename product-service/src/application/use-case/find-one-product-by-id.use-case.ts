import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { ProductRepositoryInterface } from '../../domain/repository/product.repository';
import { OutputFindOneProductByIdDto } from '../dto/find-one-product-by-id.dto';

export class FindOneProductByIdUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.productRepository = this.repositoryFactory.createProductRepository();
  }

  async execute(id: string): Promise<OutputFindOneProductByIdDto> {
    const product = await this.productRepository.findOneById(id);
    return new OutputFindOneProductByIdDto(product);
  }
}
