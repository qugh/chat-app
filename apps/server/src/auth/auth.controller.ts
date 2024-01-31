import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '@server/auth/auth.service';
import { AuthGuard } from '@server/auth/auth.guard';
import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

// import { ValidationPipe } from '@server/pipes/validation.pipe';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UsePipes(ValidationPipe)
  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
