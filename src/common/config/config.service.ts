import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable, VersioningType } from '@nestjs/common';

import { LogLevel, NodeEnvironment } from '@api/common/config/domain';

@Injectable()
export class ConfigService {
  constructor(private readonly config: NestConfigService) {}

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
