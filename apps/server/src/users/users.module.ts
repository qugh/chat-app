import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Message } from '@server/messages/message.model';
import { UsersController } from '@server/users/users.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, JwtService],
  imports: [SequelizeModule.forFeature([User, Message])],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
