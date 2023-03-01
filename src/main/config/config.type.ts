import { LogLevel } from '@nestjs/common';

export type AppConfig = {
  port: number;
  host: string;
};

export type Logging = {
  levels: LogLevel[];
};

export type DbConfig = {
  url: string;
  dbName: string;
  debugQueries: boolean;
};
