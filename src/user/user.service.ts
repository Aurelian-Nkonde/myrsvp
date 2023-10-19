import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileService: ProfileService
  ) { }

  async createUser(data: UserEntity): Promise<UserEntity> {
    const createdUser = await this.userRepository.create(data);
    const createProfile = await this.profileService.createProfile(createdUser.userId);
    if (createProfile) {
      return createdUser;
    } else {
      console.error("Error creating a profile from user module")
      throw new NotFoundException("Error creating a profile from user module")
    }
  }

  async findUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findUser(email, password);
    return user;
  }
}
