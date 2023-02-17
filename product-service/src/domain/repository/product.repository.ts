import { InputCreateProductDto } from '../../application/dto/create-product.dto';
import { ProductEntity } from '../entity/product.entity';

export interface ProductRepositoryInterface {
  findAll(): Promise<ProductEntity[]>;
  findOneById(id: string): Promise<ProductEntity | undefined>;
  createOne(data: InputCreateProductDto): Promise<ProductEntity>;
}
