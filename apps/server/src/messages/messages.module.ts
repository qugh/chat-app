import { Module } from '@nestjs/common';
import { MessagesGateway } from '@server/messages/messages.gateway';
import { MessagesService } from '@server/messages/messages.service';
import { MessagesController } from '@server/messages/messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from '@server/messages/message.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [MessagesGateway, MessagesService, JwtService],
  controllers: [MessagesController],
  imports: [SequelizeModule.forFeature([Message])],
})
export class MessagesModule {}
