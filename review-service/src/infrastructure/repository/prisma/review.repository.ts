import { InputCreateReviewDto } from '../../../application/dto/create-review.dto';
import { ReviewEntity } from '../../../domain/entity/review.entity';
import { ReviewRepositoryInterface } from '../../../domain/repository/review.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

export class PrismaReviewRepository implements ReviewRepositoryInterface {
  constructor(private readonly prismaService = new PrismaService()) {}

  async findAll(): Promise<ReviewEntity[]> {
    const result = await this.prismaService.database.reviews.findMany();
    return result.map((item) => new ReviewEntity(item));
  }

  async findOneById(id: string): Promise<ReviewEntity | undefined> {
    const result = await this.prismaService.database.reviews.findFirst({ where: { id } });
    return new ReviewEntity(result);
  }

  async createOne(data: InputCreateReviewDto): Promise<ReviewEntity> {
    const result = await this.prismaService.database.reviews.create({ data });
    return new ReviewEntity(result);
  }
}
