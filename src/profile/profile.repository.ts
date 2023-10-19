import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { ProfileEntity } from './entities/profile.entity';

// our repositories in here!, database Interaction

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel(Profile)
    private profileModel: typeof Profile
  ) { }

  async create(data: ProfileEntity): Promise<ProfileEntity> {
    const profiles = await this.profileModel.findAll();
    if (profiles) {
      const profileExistance = profiles.filter(profile => profile.userId === data.userId && profile.phoneNumber === data.phoneNumber).length;
      if (profileExistance >= 1) {
        console.error("The profile already exists");
        throw new NotFoundException("The profile already exists");
      }
      const createdprofile = this.profileModel.create({ ...data });
      return createdprofile;
    } else {
      console.error("Error getting all profiles");
      throw new NotFoundException("profiles are not found");
    }
  }

  async findProfile(id: string): Promise<ProfileEntity> {
    const profile = await this.profileModel.findOne({
      where: {
        userId: id
      }
    });
    if (profile) {
      return profile
    } else {
      console.error("Error finding a profile");
      throw new NotFoundException("Profile is not found");
    }
  }

  async findAll(): Promise<ProfileEntity[]> {
    const profiles = await this.profileModel.findAll();
    if (profiles) {
      return profiles
    } else {
      console.error("Error finding profiles");
      throw new NotFoundException("Profiles are not found")
    }
  }

  async update(data: ProfileEntity): Promise<ProfileEntity> {
    const profile = await this.profileModel.findOne({where: {
      userId: data.userId
    }})
    const updated = profile.update({
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      province: data.province,
      address: data.address
    })
    ;(await updated).save()
    return updated
  }
}
