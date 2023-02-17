import { InputCreateUserDto } from '../../application/dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';

export interface UserRepositoryInterface {
  findAll(): Promise<UserEntity[]>;
  createOne(data: InputCreateUserDto): Promise<UserEntity>;
  findOneById(id: string): Promise<UserEntity | undefined>;
}
