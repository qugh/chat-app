import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '@server/users/users.service';
import { AuthGuard } from '@server/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@server/users/users.model';

interface CustomRequest extends Request {
  user: User;
}

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Req() req: CustomRequest) {
    return await this.usersService.findOne(req.user.email);
  }
}
