import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Body, Logger } from "@nestjs/common";
import { MessagesService } from "@server/messages/messages.service";

@WebSocketGateway(5001, { namespace: "messages", transports: ["websocket"] })
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) {
  }

  private logger: Logger = new Logger("MessageGateway");

  @WebSocketServer()
  wss: Server;

  @SubscribeMessage("sendMessage")
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
    const newMessage = await this.messagesService.createMessage(payload);
    this.wss.emit("receiveMessage", newMessage);
  }

  afterInit(server: Server) {
    this.logger.log("Initialized");
    // setTimeout(() => this.wss.send('hello'), 1000);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }
}
