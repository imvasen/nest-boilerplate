import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { configurationSchema } from '@api/common/config/configurationSchema';
import * as configs from '@api/common/config/configurations';
import { ConfigService } from '@api/common/config';
import { LoggerService } from '@api/common/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Object.values(configs),
      validationSchema: configurationSchema,
    }),
  ],
  providers: [ConfigService, LoggerService],
})
export class CommonModule {}
