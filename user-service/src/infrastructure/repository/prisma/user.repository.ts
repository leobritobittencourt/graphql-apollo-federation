import { InputCreateUserDto } from '../../../application/dto/create-user.dto';
import { UserEntity } from '../../../domain/entity/user.entity';
import { UserRepositoryInterface } from '../../../domain/repository/user.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prismaService = new PrismaService()) {}

  async findAll(): Promise<UserEntity[]> {
    const result = await this.prismaService.database.users.findMany();
    return result.map((item) => new UserEntity(item));
  }

  async findOneById(id: string): Promise<UserEntity> {
    const result = await this.prismaService.database.users.findFirst({ where: { id } });
    return new UserEntity(result);
  }

  async createOne(data: InputCreateUserDto): Promise<UserEntity> {
    const result = await this.prismaService.database.users.create({ data });
    return new UserEntity(result);
  }
}
