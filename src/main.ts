import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@api/common/config';
import { AppModule } from '@api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(config.apiPrefix);
  app.enableVersioning({
    type: config.versionType,
    defaultVersion: config.apiVersion,
  });

  if (config.enableCors) {
    app.enableCors();
  }

  await app.listen(config.port);
}

bootstrap();
