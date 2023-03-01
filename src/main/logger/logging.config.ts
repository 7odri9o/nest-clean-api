import * as winston from 'winston';
import { ConsoleLogger } from '@nestjs/common';
import { format, transports } from './winston.utils';

export const loggingConfig = {
  level: 'silly',
  format: winston.format.combine(
    format.defaultContext({ context: 'nest-ts-api' }),
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.splat(),
  ),

  transports: [new transports.NestTransport(new ConsoleLogger())],
} as winston.LoggerOptions;
