import { InputCreateReviewDto } from '../../application/dto/create-review.dto';
import { CreateReviewUseCase } from '../../application/use-case/create-review.use-case';
import { FindAllReviewsUseCase } from '../../application/use-case/find-all-reviews.use-case';
import { FindOneReviewByIdUseCase } from '../../application/use-case/find-one-review-by-id.use-case';
import { RepositoryFactoryInterface } from '../../domain/factory/repository.factory';

export class ReviewController {
  constructor(private readonly repositoryFactory: RepositoryFactoryInterface) {}

  async findAll() {
    const useCase = new FindAllReviewsUseCase(this.repositoryFactory);
    return useCase.execute();
  }

  async findOneById(id: string) {
    const useCase = new FindOneReviewByIdUseCase(this.repositoryFactory);
    return useCase.execute(id);
  }

  async create(data: InputCreateReviewDto) {
    const useCase = new CreateReviewUseCase(this.repositoryFactory);
    return await useCase.execute(data);
  }
}
