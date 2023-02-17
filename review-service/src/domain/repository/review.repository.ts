import { InputCreateReviewDto } from '../../application/dto/create-review.dto';
import { ReviewEntity } from '../entity/review.entity';

export interface ReviewRepositoryInterface {
  findAll(): Promise<ReviewEntity[]>;
  findOneById(id: string): Promise<ReviewEntity | undefined>;
  createOne(data: InputCreateReviewDto): Promise<ReviewEntity>;
}
