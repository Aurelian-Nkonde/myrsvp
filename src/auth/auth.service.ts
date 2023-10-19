import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  async signin(email, password): Promise<any> {
    const user = await this.userService.findUser(email, password);
    if (user) {
      const payload = { sub: user.firstName, pass: user.password };
      return {
        user,
        access_token: await this.jwtService.signAsync(payload)
      }
    } else {
      console.error("Error signing up");
      throw new NotFoundException("Error signin up")
    }
  }
}
