import { Request, Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { ConfigService } from '@api/common/config';
import { LoggerService } from '@api/common/logger';

interface HttpExceptionResponse {
  dev: unknown;
}

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  private readonly logLabel = 'HttpExceptionFilter';

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.http({
      context: this.logLabel,
      message: `${request.method} ${request.url} (${status})`,
    });

    const currentResponse: HttpExceptionResponse =
      exception.getResponse() as HttpExceptionResponse;

    if (!this.config.isDevelopment) {
      delete currentResponse.dev;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...currentResponse,
    });
  }
}
