import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends PassportAuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (info instanceof Error && info.name === 'JsonWebTokenError') {
      throw new HttpException(
        { message: info.message },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (err) {
      throw err;
    }

    return user;
  }
}
