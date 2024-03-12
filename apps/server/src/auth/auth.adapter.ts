import { IoAdapter } from '@nestjs/platform-socket.io';
import { User } from '@server/users/users.model';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { INestApplicationContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { UsersService } from '@server/users/users.service';

export interface CustomSocket extends Socket {
  user: Pick<User, 'id' | 'email' | 'createdAt'>;
}

export class AuthAdapter extends IoAdapter {
  private readonly jwtService: JwtService;
  private readonly usersService: UsersService;

  constructor(private app: INestApplicationContext) {
    super(app);
    this.jwtService = this.app.get(JwtService);
    this.usersService = this.app.get(UsersService);
  }

  createIOServer(port: number, options): any {
    const server: Server = super.createIOServer(port, {
      ...options,
      cors: true,
    });

    server.use(async (socket: CustomSocket, next) => {
      const token: string = socket.handshake.auth?.jwt;

      if (!token) {
        return next(new WsException('Token not provided'));
      }

      try {
        const payload: User = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

        const { id, email, createdAt } = await this.usersService.findOne(
          payload.email,
        );

        socket.user = { id, email, createdAt };
        return next();
      } catch (e) {
        return next(new WsException('Auth error'));
      }
    });

    return server;
  }
}
