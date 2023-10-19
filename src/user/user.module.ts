import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    ProfileModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
