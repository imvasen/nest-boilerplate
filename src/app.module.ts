import { Module } from '@nestjs/common';

import { AppController } from '@api/app.controller';
import { AppService } from '@api/app.service';
import { CommonModule } from '@api/common';

@Module({
  imports: [CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
