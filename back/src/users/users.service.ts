import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(filter: DeepPartial<User>) {
    return this.usersRepository.findOne({
      where: { ...filter },
    });
  }

  create(user: CreateUserDto): Promise<UserDto> {
    return this.usersRepository.save(this.usersRepository.create(user));
  }

  async update(user: DeepPartial<User>): Promise<User> {
    return await this.usersRepository.save({
      ...user,
    });
  }

  async delete(id: number) {
    const rows = await this.usersRepository.delete({ id });
    return !!rows.affected;
  }
}
