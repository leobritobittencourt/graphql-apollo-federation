import { Prisma } from '@prisma/client';
import { InputCreateProductDto } from '../../../application/dto/create-product.dto';
import { ProductEntity } from '../../../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../../domain/repository/product.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

export class PrismaProductRepository implements ProductRepositoryInterface {
  constructor(private readonly prismaService = new PrismaService()) {}

  async findAll(): Promise<ProductEntity[]> {
    const result = await this.prismaService.database.products.findMany();
    return result.map((item) => new ProductEntity({ ...item, price: item.price.toNumber() }));
  }

  async findOneById(id: string): Promise<ProductEntity | undefined> {
    const result = await this.prismaService.database.products.findFirst({ where: { id } });
    return new ProductEntity({ ...result, price: result.price.toNumber() });
  }

  async createOne(data: InputCreateProductDto): Promise<ProductEntity> {
    const result = await this.prismaService.database.products.create({ data });
    return new ProductEntity({ ...result, price: result.price.toNumber() });
  }
}
