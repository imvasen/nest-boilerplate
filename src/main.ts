import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { HttpInterceptor } from '@api/common/http.interceptor';
import { HttpFilter } from '@api/common/http.filter';
import { ConfigService } from '@api/common/config';
import { LoggerService } from '@api/common/logger';
import { AppModule } from '@api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get(LoggerService);

  app.useLogger(logger);
  app.setGlobalPrefix(config.apiPrefix);
  app.enableVersioning({
    type: config.versionType,
    defaultVersion: config.apiVersion,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new HttpInterceptor(logger));
  app.useGlobalFilters(new HttpFilter(config, logger));

  if (config.enableCors) {
    app.enableCors();
  }

  await app.listen(config.port);
}

bootstrap();
