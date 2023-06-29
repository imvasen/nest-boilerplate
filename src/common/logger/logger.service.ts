import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

import { LogLevel } from '@api/common/config/domain';
import { ConfigService } from '@api/common/config';

interface LogDetails {
  message: string;
  context?: string;
  level?: LogLevel;
  meta?: { [index: string]: string | number | boolean | object | null };
  values?: { [index: string]: string };
}

interface ParseArgsOpts {
  includeLevel?: boolean;
}

type LogFunctionArgs =
  | [LogDetails]
  | [message: string, _?: string, context?: string];

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(private readonly config: ConfigService) {
    // Initialize logger
    this.logger = winston.createLogger({
      level: this.config.logLevel,
      format: winston.format.json(),
      transports: [],
      silent: this.config.isTest,
    });

    if (this.config.isDevelopment) {
      // Add console if development
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY/MM/DDThh:mm:ss' }),
            winston.format.printf(
              ({ level, message, context, timestamp: time }) => {
                return `[${level.slice(
                  0,
                  4,
                )}@${time}] - ${context}: ${message}`;
              },
            ),
            winston.format.colorize({ all: true }),
          ),
        }),
      );
    }
  }

  /**
   * Parses the args log functions receive and returns a standardized input.
   * @param args Possible arguments.
   * @param options Options for parsing.
   * @returns LogDetails object.
   */
  private parseArgs(
    args: LogFunctionArgs,
    { includeLevel = false }: ParseArgsOpts = {},
  ): LogDetails {
    let details: LogDetails;

    if (typeof args[0] === 'string') {
      details = {
        message: args[0],
        context: (args.length === 3 ? args[2] : args[1]) ?? this.config.appName,
      };
    } else {
      details = args[0];
      if (!includeLevel) {
        delete details.level;
      }
    }

    return { context: this.config.appName, ...details };
  }

  public log(...args: LogFunctionArgs): void {
    const { level = LogLevel.info, ...details } = this.parseArgs(args);
    this.logger.log({ level, ...details });
  }

  public error(...args: LogFunctionArgs): void {
    const details = this.parseArgs(args);
    this.logger.error(details);
  }

  public warn(...args: LogFunctionArgs): void {
    const details = this.parseArgs(args);
    this.logger.warn(details);
  }

  public info(...args: LogFunctionArgs): void {
    const details = this.parseArgs(args);
    this.logger.info(details);
  }

  public http(...args: LogFunctionArgs): void {
    const details = this.parseArgs(args);
    this.logger.http(details);
  }

  public verbose(...args: LogFunctionArgs): void {
    const details = this.parseArgs(args);
    this.logger.verbose(details);
  }

  public debug(...args: LogFunctionArgs): void {
    const details = this.parseArgs(args);
    this.logger.debug(details);
  }

  public silly(...args: LogFunctionArgs): void {
    const details = this.parseArgs(args);
    this.logger.silly(details);
  }
}
