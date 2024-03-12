import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Message } from '@server/messages/message.model';
import { MessagesService } from '@server/messages/messages.service';
import { AuthGuard } from '@server/auth/auth.guard';
import { CreateMessageDto } from '@server/messages/dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllMessages(): Promise<Message[]> {
    const messages = await this.messagesService.getAllMessages();
    return messages;
  }

  @Get(':id')
  async getMessageById(@Param('id') id: string): Promise<Message> {
    const message = await this.messagesService.getMessageById(Number(id));
    return message;
  }

  @Post()
  async createMessage(@Body() dto: CreateMessageDto) {
    const newMessage = await this.messagesService.createMessage(dto);
    return newMessage;
  }

  @Delete()
  async deleteAllMessages() {
    await this.messagesService.deleteAllMessages();
  }
}
