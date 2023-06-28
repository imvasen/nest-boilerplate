import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable, VersioningType } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(private readonly config: NestConfigService) {}

  get port(): number {
    return this.config.get<number>('port');
  }

  get isProduction(): boolean {
    return this.config.get<string>('environment') === 'production';
  }

  get apiPrefix(): string {
    return 'api';
  }

  get apiVersion(): string {
    return '1';
  }

  get nodeEnv(): string {
    return this.config.get<string>('environment');
  }

  get versionType(): VersioningType.URI {
    return VersioningType.URI;
  }

  get enableCors(): boolean {
    return !this.isProduction;
  }
}
