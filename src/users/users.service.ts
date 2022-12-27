import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   *
   * @param name userName
   * @param email userEmailAddress
   */
  async create({ name, email }: CreateUserDto): Promise<User> {
    return await this.userRepository
      .save({
        name: name,
        email: email,
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          `[${e.message}]：アカウントの登録に失敗しました。`,
        );
      });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
