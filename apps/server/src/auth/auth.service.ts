import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@server/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  async signIn(email: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }


}
