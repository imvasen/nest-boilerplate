import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ExecutionContext,
  NestInterceptor,
  HttpException,
  CallHandler,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { LoggerService } from '@api/common/logger';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  private readonly logLabel = 'HttpInterceptor';

  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, path } = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        const { statusCode } = context.switchToHttp().getResponse();
        this.logger.http({
          context: this.logLabel,
          message: `${method} ${path} (${statusCode})`,
        });
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          this.logger.http({
            context: this.logLabel,
            message: `${method} ${path} (${err.getStatus()})`,
          });
          throw err;
        }

        this.logger.warn({
          context: this.logLabel,
          message: `Unhandled error - ${err}`,
        });
        throw new HttpException(
          { message: 'Internal server error' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
