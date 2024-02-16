import { IoAdapter } from '@nestjs/platform-socket.io';
import { User } from '@server/users/users.model';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { INestApplicationContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ExtendedError } from 'socket.io/dist/namespace';

export interface CustomSocket extends Socket {
  user: User;
}

export class AuthAdapter extends IoAdapter {
  private readonly jwtService: JwtService;

  constructor(private app: INestApplicationContext) {
    super(app);
    this.jwtService = this.app.get(JwtService);
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
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

        socket.user = payload;
        return next();
      } catch (e) {
        return next(new WsException('Auth error'));
      }
    });

    return server;
  }
}
