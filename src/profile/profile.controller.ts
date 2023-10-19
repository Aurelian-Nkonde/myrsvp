import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Next, HttpStatus, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request, Response } from 'express';
import { ProfileEntity } from './entities/profile.entity';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  async getAllProfiles(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    try {
      const res = await this.profileService.getAllProfiles();
      response.status(HttpStatus.OK).json(res)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('/:id')
  async getProfile(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.profileService.getProfile(id);
      response.status(HttpStatus.OK).json(res)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('/:id')
  async updateProfile(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const { id } = request.params;
    const { gender, phoneNumber, province, address } = request.body;

    const data:ProfileEntity = {
      gender, phoneNumber, province, address, userId: id
    }
    try {
      const res = await this.profileService.updateProfile(id,data);
      response.status(HttpStatus.OK).json(res)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}
