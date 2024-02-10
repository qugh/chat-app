import { IoAdapter } from '@nestjs/platform-socket.io';
import { User } from '@server/users/users.model';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

export interface CustomSocket extends Socket {
  user: User;
}

export class AuthAdapter extends IoAdapter {
  private jwtService = new JwtService();

  createIOServer(port: number, options): any {
    const server = super.createIOServer(port, { ...options, cors: true });

    server.use(async (socket: CustomSocket, next) => {
      const token: string = socket.handshake.auth?.jwt;

      if (token) {
        try {
          const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
          });

          socket.user = payload;
          next();
        } catch (e) {
          next(new Error('Auth error'));
        }
      } else {
        next(new Error('Authentication error'));
      }
    });
    return server;
  }
}
