import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { ReviewRepositoryInterface } from '../../domain/repository/review.repository';
import { InputCreateReviewDto, OutputCreateReviewDto } from '../dto/create-review.dto';

export class CreateReviewUseCase {
  private readonly reviewRepository: ReviewRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.reviewRepository = this.repositoryFactory.createReviewRepository();
  }

  async execute(data: InputCreateReviewDto): Promise<OutputCreateReviewDto> {
    const review = await this.reviewRepository.createOne(data);
    return new OutputCreateReviewDto(review);
  }
}
