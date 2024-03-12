import { Module } from '@nestjs/common';
import { MessagesGateway } from '@server/messages/messages.gateway';
import { MessagesService } from '@server/messages/messages.service';
import { MessagesController } from '@server/messages/messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from '@server/messages/message.model';
import { JwtService } from '@nestjs/jwt';
import { User } from '@server/users/users.model';

@Module({
  providers: [MessagesGateway, MessagesService, JwtService],
  controllers: [MessagesController],
  imports: [SequelizeModule.forFeature([User, Message])],
})
export class MessagesModule {}
