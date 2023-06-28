import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import * as configs from '@api/common/config/configurations';
import { ConfigService } from '@api/common/config';

@Module({
  imports: [ConfigModule.forRoot({ load: Object.values(configs) })],
  providers: [ConfigService],
})
export class CommonModule {}
