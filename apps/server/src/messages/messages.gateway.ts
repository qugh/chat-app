import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Body, Logger, UseGuards } from '@nestjs/common';
import { MessagesService } from '@server/messages/messages.service';
import { AuthWsGuard } from '@server/auth/auth.ws.guard';

@WebSocketGateway(5001, { namespace: 'messages', transports: ['websocket'] })
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesService: MessagesService) {}

  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer()
  wss: Server;

  @UseGuards(AuthWsGuard)
  @SubscribeMessage('message')
  async handleSendMessage(
    client: Socket,
    payload: { data: string },
  ): Promise<void> {
    const newMessage = await this.messagesService.createMessage(payload.data);
    this.wss.emit('message', newMessage);
  }

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }
}
