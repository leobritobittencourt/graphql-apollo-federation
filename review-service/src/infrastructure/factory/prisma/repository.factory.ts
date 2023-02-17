import { RepositoryFactoryInterface } from '../../../domain/factory/repository.factory';
import { ReviewRepositoryInterface } from '../../../domain/repository/review.repository';
import { PrismaReviewRepository } from '../../repository/prisma/review.repository';

export class PrismaRepositoryFactory implements RepositoryFactoryInterface {
  createReviewRepository(): ReviewRepositoryInterface {
    return new PrismaReviewRepository();
  }
}
