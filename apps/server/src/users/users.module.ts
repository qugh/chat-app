import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Message } from '@server/messages/message.model';

@Module({
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Message])],
  exports: [UsersService],
})
export class UsersModule {}
