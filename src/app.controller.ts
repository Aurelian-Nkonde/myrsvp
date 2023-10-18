import { Controller, Get, HttpCode, HttpStatus, Next, Param, Put, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller('status')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async statusApp(): Promise<string> {
    return await this.appService.statusApp();
  }
}
