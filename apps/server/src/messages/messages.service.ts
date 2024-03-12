import { NotFoundException } from '@nestjs/common';
import { Message } from '@server/messages/message.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from '@server/messages/dto/create-message.dto';

export class MessagesService {
  constructor(
    @InjectModel(Message)
    private messagesRepository: typeof Message,
  ) {}

  async getAllMessages() {
    const messages = this.messagesRepository.findAll();
    return messages;
  }

  async deleteAllMessages() {
    await this.messagesRepository.truncate();
  }

  async getMessageById(id: number) {
    const message = await this.messagesRepository.findOne({
      where: {
        id,
      },
    });
    if (message) {
      return message;
    }
    throw new NotFoundException('Could not find the message');
  }

  async createMessage(dto: CreateMessageDto) {
    const newMessage = await this.messagesRepository.create(dto);
    return newMessage;
  }
}
