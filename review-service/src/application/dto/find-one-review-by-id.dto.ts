export class OutputFindOneReviewByIdDto {
  id: string;
  observation: string;
  score: number;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt?: Date | null;

  constructor(data: OutputFindOneReviewByIdDto) {
    this.id = data.id;
    this.observation = data.observation;
    this.score = data.score;
    this.userId = data.userId;
    this.productId = data.productId;
    this.createdAt = data.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
