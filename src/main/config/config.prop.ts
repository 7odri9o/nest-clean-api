import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, Logging } from './config.type';
import { parseList } from '@/main/util';

@Injectable()
export class ConfigProperties {
  readonly app: AppConfig;
  readonly logging: Logging;

  constructor(configService: ConfigService) {
    this.app = {
      port: parseInt(configService.getOrThrow('APP_PORT'), 10),
      host: configService.getOrThrow('APP_HOST'),
    };

    this.logging = {
      levels: parseList(configService.getOrThrow<string>('LOG_LEVELS')).map(
        (item) => (item === 'info' ? 'log' : item),
      ) as LogLevel[],
    };
  }
}
