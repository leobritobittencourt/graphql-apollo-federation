import { randomUUID } from 'node:crypto';

export class UserEntity {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

  constructor(data: UserEntity) {
    this.id = data.id ?? randomUUID();
    this.name = data.name;
    this.username = data.username;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data?.updatedAt;
    this.deletedAt = data?.deletedAt;
  }
}
