import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards, UsePipes } from '@nestjs/common';
import { MessagesService } from '@server/messages/messages.service';
import { AuthWsGuard } from '@server/auth/auth.ws.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateMessageDto } from '@server/messages/dto/create-message.dto';
import { CustomSocket } from '@server/auth/auth.adapter';
import { WSValidationPipe } from '@server/pipes/ws-validation.pipe';

@WebSocketGateway(5001, { transports: ['websocket'] })
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer()
  wss: Server;

  @UsePipes(new WSValidationPipe())
  @UseGuards(AuthWsGuard)
  @SubscribeMessage('message')
  async handleSendMessage(
    client: CustomSocket,
    data: CreateMessageDto,
  ): Promise<void> {
    const newMessage = await this.messagesService.createMessage({
      ...data,
      //@ts-ignore
      userId: client.user.id,
      email: client.user.email,
    });
    this.wss.emit('message', newMessage);
  }

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const token = client.handshake.auth.jwt;

      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      client.disconnect();
    }
    this.logger.log(`Client Connected: ${client.id}`);
  }
}
