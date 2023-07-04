import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController, AuthService } from '@api/auth/auth';
import * as configs from '@api/common/config/configurations';
import { JwtStrategy } from '@api/auth/jwt.strategy';
import { JwtAuthGuard } from '@api/auth/jwt.guard';
import { UsersService } from '@api/auth/users';
import { ConfigService } from '@api/common/config';
import { CommonModule } from '@api/common';
import { User } from '@api/auth/models';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(configs.loadAuthConfig)],
      useClass: ConfigService,
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    UsersService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
