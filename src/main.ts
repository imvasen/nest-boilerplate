import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { ConfigService } from '@api/common/config';
import { LoggerService } from '@api/common/logger';
import { AppModule } from '@api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get<ConfigService>(ConfigService);

  app.useLogger(app.get(LoggerService));
  app.setGlobalPrefix(config.apiPrefix);
  app.enableVersioning({
    type: config.versionType,
    defaultVersion: config.apiVersion,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (config.enableCors) {
    app.enableCors();
  }

  await app.listen(config.port);
}

bootstrap();
