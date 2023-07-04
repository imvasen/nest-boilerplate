import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { configurationSchema } from '@api/common/config/configuration.schema';
import * as configs from '@api/common/config/configurations';
import { ConfigService } from '@api/common/config';
import { LoggerService } from '@api/common/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Object.values(configs),
      validationSchema: configurationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(configs.loadDatabaseConfig)],
      useClass: ConfigService,
    }),
  ],
  providers: [ConfigService, LoggerService],
  exports: [ConfigService, LoggerService],
})
export class CommonModule {}
