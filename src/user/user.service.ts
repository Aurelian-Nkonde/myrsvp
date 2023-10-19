import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async createUser(data: UserEntity): Promise<UserEntity> {
    const createdUser = await this.userRepository.create(data);
    return createdUser;
  }

  async findUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findUser(email, password);
    return user;
  }
}
