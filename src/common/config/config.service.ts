import { ConfigService as NestConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Injectable, VersioningType } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { JwtOptionsFactory } from '@nestjs/jwt';

import { LogLevel, NodeEnvironment } from '@api/common/config/domain';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory, JwtOptionsFactory {
  constructor(private readonly config: NestConfigService) {}

  createJwtOptions() {
    return { secret: this.config.get<string>('auth.jwtSecret') };
  }

  get jwtSecret(): string {
    return this.config.get<string>('auth.jwtSecret');
  }

  createTypeOrmOptions() {
    return {
      autoLoadEntities: true,
      verboseRetryLog: true,
      synchronize: this.isDevelopment,
      type: this.config.get<string>('database.type') as any,
      host: this.config.get<string>('database.host'),
      username: this.config.get<string>('database.username'),
      password: this.config.get<string>('database.password'),
      database: this.config.get<string>('database.database'),
      port: this.config.get<number>('database.port'),
      namingStrategy: new SnakeNamingStrategy(),
      ssl: this.config.get<boolean>('database.ssl'),
    };
  }

  get logLevel(): LogLevel {
    return this.config.get<LogLevel>('logLevel');
  }

  get port(): number {
    return this.config.get<number>('port');
  }

  get appName(): string {
    return 'API';
  }

  get environment(): NodeEnvironment {
    return this.config.get<NodeEnvironment>('environment');
  }

  get isDevelopment(): boolean {
    return this.environment === 'development';
  }

  get isTest(): boolean {
    return this.environment === 'test';
  }

  get isProduction(): boolean {
    return this.environment === 'production';
  }

  get apiPrefix(): string {
    return 'api';
  }

  get apiVersion(): string {
    return '1';
  }

  get versionType(): VersioningType.URI {
    return VersioningType.URI;
  }

  get enableCors(): boolean {
    return !this.isProduction;
  }
}
