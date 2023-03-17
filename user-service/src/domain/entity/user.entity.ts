import { randomUUID } from 'node:crypto';
import { UserAddressEntity } from './user-address.entity';

export class UserEntity {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
  addresses?: UserAddressEntity[];
  updatedAt?: Date | null;
  deletedAt?: Date | null;

  constructor(data: UserEntity) {
    this.id = data.id ?? randomUUID();
    this.name = data.name;
    this.username = data.username;
    this.addresses = data?.addresses ? data.addresses.map((address) => new UserAddressEntity(address)) : undefined;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data?.updatedAt;
    this.deletedAt = data?.deletedAt;
  }
}
