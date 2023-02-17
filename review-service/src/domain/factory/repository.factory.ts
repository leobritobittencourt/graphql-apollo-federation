import { ReviewRepositoryInterface } from '../repository/review.repository';

export interface RepositoryFactoryInterface {
  createReviewRepository(): ReviewRepositoryInterface;
}
