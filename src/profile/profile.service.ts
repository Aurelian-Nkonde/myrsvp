import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { ProfileRepository } from './profile.repository';
import { NotFoundError } from 'rxjs';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    // @InjectModel(Profile)
    private readonly profileRepository: ProfileRepository
  ) { }

  async createProfile(userId: string): Promise<ProfileEntity> {
    const created = await this.profileRepository.create({ userId });
    if (created) {
      return created;
    } else {
      console.error("Error creating a profile");
      throw new NotFoundException("Error creating a profile");
    }
  }

  async getAllProfiles(): Promise<ProfileEntity[]> {
    const profiles = await this.profileRepository.findAll();
    if (profiles) {
      return profiles;
    } else {
      console.error("Error getting all profiles");
      throw new NotFoundException("Profiles are not found");
    }
  }

  async getProfile(id: string): Promise<ProfileEntity> {
    console.log(await this.profileRepository.findProfile(id));
    const profile = await this.profileRepository.findProfile(id);
    if (profile) {
      return profile;
    } else {
      console.error("Error finding a profiles");
      throw new NotFoundException("Profile is not found");
    }
  }

  async updateProfile(id:string,data: ProfileEntity): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findProfile(id);
    if(profile){
      const updated = await this.profileRepository.update(data);
      if(updated){
        return updated;
      }else {
        console.error("Error updating profile");
        throw new NotFoundException("Profile is not updated")
      }
    }else{
      console.error("Error finding a profiles");
      throw new NotFoundException("Profile is not found");
    }
    
  }

}
