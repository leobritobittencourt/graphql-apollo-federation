import { randomUUID } from 'node:crypto';

export class UserAddressEntity {
  id: string;
  address: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

  constructor(data: UserAddressEntity) {
    this.id = data.id ?? randomUUID();
    this.address = data.address;
    this.userId = data.userId;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data?.updatedAt;
    this.deletedAt = data?.deletedAt;
  }
}
