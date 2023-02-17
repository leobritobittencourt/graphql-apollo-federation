import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';
import { ReviewRepositoryInterface } from '../../domain/repository/review.repository';
import { OutputFindAllReviewsDto } from '../dto/find-all-reviews.dto';

export class FindAllReviewsUseCase {
  private readonly reviewRepository: ReviewRepositoryInterface;

  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {
    this.reviewRepository = this.repositoryFactory.createReviewRepository();
  }

  async execute(): Promise<OutputFindAllReviewsDto[]> {
    const reviews = await this.reviewRepository.findAll();
    return reviews.map((user) => new OutputFindAllReviewsDto(user));
  }
}
