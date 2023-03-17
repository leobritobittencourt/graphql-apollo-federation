import { InputCreateUserDto } from '../../../application/dto/create-user.dto';
import { UserEntity } from '../../../domain/entity/user.entity';
import { UserRepositoryInterface } from '../../../domain/repository/user.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prismaService = new PrismaService()) {}

  async findAll(): Promise<UserEntity[]> {
    const result = await this.prismaService.database.users.findMany({ include: { addresses: true } });
    return result.map((item) => new UserEntity(item));
  }

  async findOneById(id: string): Promise<UserEntity> {
    const result = await this.prismaService.database.users.findFirst({ include: { addresses: true }, where: { id } });
    return new UserEntity(result);
  }

  async createOne(data: InputCreateUserDto): Promise<UserEntity> {
    const result = await this.prismaService.database.users.create({
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
        addresses: true,
      },
      data: {
        name: data.name,
        username: data.username,
        addresses: {
          create: {
            address: data.address,
          },
        },
      },
    });
    return new UserEntity(result);
  }

  async updateOneById(id: string, data: InputCreateUserDto): Promise<UserEntity> {
    const result = await this.prismaService.database.users.update({
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
        addresses: true,
      },
      data: {
        name: data.name,
        username: data.username,
        addresses: {
          create: {
            address: data.address,
          },
        },
      },
      where: {
        id,
      },
    });
    return new UserEntity(result);
  }
}
