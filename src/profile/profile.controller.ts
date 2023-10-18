import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Next, HttpStatus } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request, Response } from 'express';


@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  async getAllProfiles(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    try {
      const res = await this.profileService.getAllRvps();
      response.status(HttpStatus.OK).json(res)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}
