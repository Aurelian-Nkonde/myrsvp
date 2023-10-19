import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Next, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('signup')
  async signup(@Req() request: Request, @Res() response: Response, @Next() next, @Body() body): Promise<void> {
    const { firstName, lastName, email, password } = body;
    const data: UserEntity = { firstName, lastName, email, password };
    try {
      const res = await this.userService.createUser(data)
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Req() request: Request, @Res() response: Response, @Next() next): Promise<void> {
    const { email, password } = request.body;
    try {
      const res = await this.authService.signin(email, password)
      response.status(HttpStatus.OK).json(res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}
