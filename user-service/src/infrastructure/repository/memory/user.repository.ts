import { InputCreateUserDto } from '../../../application/dto/create-user.dto';
import { InputUpdateOneUserByIdDto } from '../../../application/dto/update-one-user-by-id.dto';
import { UserEntity } from '../../../domain/entity/user.entity';
import { UserRepositoryInterface } from '../../../domain/repository/user.repository';
import { MemoryDatabaseService } from '../../database/memory/memory.database';

export class MemoryUserRepository implements UserRepositoryInterface {
  constructor(private readonly memoryService = MemoryDatabaseService.getInstance()) {}

  async findAll(): Promise<UserEntity[]> {
    const result = this.memoryService.database.users;
    return result.map((item) => new UserEntity(item));
  }

  async createOne(data: InputCreateUserDto): Promise<UserEntity> {
    const user = new UserEntity(data);
    this.memoryService.database.users.push(user);
    return user;
  }

  async findOneById(id: string): Promise<UserEntity> {
    const result = this.memoryService.database.users.find((u) => u.id === id);
    if (result) {
      return new UserEntity(result);
    }
  }

  async updateOneById(id: string, data: InputUpdateOneUserByIdDto): Promise<UserEntity> {
    const index = this.memoryService.database.users.findIndex((u) => u.id === id);
    const user = this.memoryService.database.users[index];
    const newUser = { ...user, ...data };
    this.memoryService.database.users = newUser;
    return newUser;
  }
}
