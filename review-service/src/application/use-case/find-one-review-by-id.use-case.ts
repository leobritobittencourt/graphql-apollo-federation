import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { ReviewRepositoryInterface } from '../../domain/repository/review.repository';
import { OutputFindOneReviewByIdDto } from '../dto/find-one-review-by-id.dto';

export class FindOneReviewByIdUseCase {
  private readonly reviewRepository: ReviewRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.reviewRepository = this.repositoryFactory.createReviewRepository();
  }

  async execute(id: string): Promise<OutputFindOneReviewByIdDto> {
    const review = await this.reviewRepository.findOneById(id);
    return new OutputFindOneReviewByIdDto(review);
  }
}
