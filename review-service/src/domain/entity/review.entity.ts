import { randomUUID } from 'node:crypto';

export class ReviewEntity {
  id: string;
  observation: string;
  score: number;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

  constructor(data?: Partial<ReviewEntity>) {
    this.id = data?.id ?? randomUUID();
    this.observation = data?.observation;
    this.score = data?.score;
    this.userId = data?.userId;
    this.productId = data?.productId;
    this.createdAt = data?.createdAt ?? new Date();
    this.updatedAt = data?.updatedAt;
    this.deletedAt = data?.deletedAt;
  }
}
