import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Next, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Request, Response } from 'express';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Get('/:userId')
  async getAllNotifications(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const { userId } = request.params;
    try {
      const res = await this.notificationService.getNotifications(userId)
      response.status(HttpStatus.OK).json(res)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Get('/:useId/:id')
  async readNotification(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const {userId, id} = request.params;
    try {
      const res = await this.notificationService.readNotification(id, userId);
      response.status(HttpStatus.OK).json(res)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}
