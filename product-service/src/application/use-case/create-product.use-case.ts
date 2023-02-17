import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { ProductRepositoryInterface } from '../../domain/repository/product.repository';
import { InputCreateProductDto, OutputCreateProductDto } from '../dto/create-product.dto';

export class CreateProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.productRepository = this.repositoryFactory.createProductRepository();
  }

  async execute(data: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = await this.productRepository.createOne(data);
    return new OutputCreateProductDto(product);
  }
}
