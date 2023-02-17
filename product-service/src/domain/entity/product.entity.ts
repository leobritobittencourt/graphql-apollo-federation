import { randomUUID } from 'node:crypto';

export class ProductEntity {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

  constructor(data?: Partial<ProductEntity>) {
    this.id = data?.id ?? randomUUID();
    this.name = data?.name;
    this.price = data?.price;
    this.createdAt = data?.createdAt ?? new Date();
    this.updatedAt = data?.updatedAt;
    this.deletedAt = data?.deletedAt;
  }
}
