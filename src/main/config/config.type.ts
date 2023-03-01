import { LogLevel } from '@nestjs/common';

export type AppConfig = {
  port: number;
  host: string;
};

export type Logging = {
  levels: LogLevel[];
};
