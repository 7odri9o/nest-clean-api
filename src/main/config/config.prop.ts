import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, DbConfig, Logging } from './config.type';
import { parseBoolean, parseList } from '@/main/util';

@Injectable()
export class ConfigProperties {
  readonly app: AppConfig;
  readonly dbConfig: DbConfig;
  readonly logging: Logging;

  constructor(configService: ConfigService) {
    this.app = {
      port: parseInt(configService.getOrThrow('APP_PORT'), 10),
      host: configService.getOrThrow('APP_HOST'),
    };

    this.dbConfig = {
      url: configService.get('DB_URL'),
      dbName: configService.get('DB_NAME'),
      debugQueries: parseBoolean(configService.get('DEBUG_QUERIES')),
    };

    this.logging = {
      levels: parseList(configService.getOrThrow<string>('LOG_LEVELS')).map(
        (item) => (item === 'info' ? 'log' : item),
      ) as LogLevel[],
    };
  }
}
