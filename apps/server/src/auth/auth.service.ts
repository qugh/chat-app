import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@server/users/users.service';
import { User } from '@server/users/users.model';
import { CreateUserDto } from '@server/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: CreateUserDto): Promise<User> {
    if (!data.password || !data.email)
      throw new HttpException('Заполните все поля', HttpStatus.BAD_REQUEST);

    const user = await this.usersService.createUser(data);
    return user;
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
