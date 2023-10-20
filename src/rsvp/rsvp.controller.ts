import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Next, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { RsvpEntity } from './entities/rsvp.entity';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/constants/authGuard';

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) { }

  @Get()
  @UseGuards(AuthGuard)
  async getAllRsvps(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    try {
      const res = await this.rsvpService.getAllRsvps();
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getRsvp(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.rsvpService.getRsvp(id);
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createRvp(@Req() request: Request, @Res() response: Response, @Next() next, @Body() rsvp: RsvpEntity): Promise<void> {
    const { userId } = request.params;
    try {
      const res = await this.rsvpService.createRsvp(rsvp);
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  async updateRsvp(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const { id } = request.params;
    const { data } = request.body;
    try {
      const res = await this.rsvpService.updateRsvp(id, data);
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async deleteRsvp(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.rsvpService.deleteRsvp(id);
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('accept/:id')
  @UseGuards(AuthGuard)
  async acceptRsvp(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.rsvpService.acceptRsvp(id);
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Put('decline/:id')
  @UseGuards(AuthGuard)
  async declineRsvp(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const { id } = request.params;
    try {
      const res = await this.rsvpService.declineRsvp(id);
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('total/rsvps')
  async totalRsvpsCount(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    try {
      const res = await this.rsvpService.totalRsvpsCount();
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('total/active/rsvps')
  async totalActiveRsvpsCount(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    try {
      const res = await this.rsvpService.totalActiveRsvpsCount();
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}
