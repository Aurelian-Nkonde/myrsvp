import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { ProfileRepository } from './profile.repository';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile)
    private profileModel: typeof Profile,
    private readonly profileRepository: ProfileRepository
  ) { }

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  async getAllRvps(): Promise<any>{
    const rvps = await this.profileRepository.findAll();
    if(rvps){
      return rvps;
    }else {
      console.error('Error finding rsvps');
      throw new NotFoundError('The rsvps are not found');
    }
  }
}
