import { InputCreateProductDto } from '../../application/dto/create-product.dto';
import { CreateProductUseCase } from '../../application/use-case/create-product.use-case';
import { FindAllProductsUseCase } from '../../application/use-case/find-all-products.use-case';
import { FindOneProductByIdUseCase } from '../../application/use-case/find-one-product-by-id.use-case';
import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';

export class ProductController {
  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {}

  async findAll() {
    const useCase = new FindAllProductsUseCase(this.repositoryFactory);
    return useCase.execute();
  }

  async findOneById(id: string) {
    const useCase = new FindOneProductByIdUseCase(this.repositoryFactory);
    return useCase.execute(id);
  }

  async create(data: InputCreateProductDto) {
    const useCase = new CreateProductUseCase(this.repositoryFactory);
    return await useCase.execute(data);
  }
}
