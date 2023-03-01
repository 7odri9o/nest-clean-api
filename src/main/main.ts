import { createLogger } from 'winston';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigProperties } from './config';
import { WinstonLoggerService, loggingConfig } from './logger';

async function bootstrap() {
  const logger = new WinstonLoggerService(createLogger(loggingConfig));

  const app = await NestFactory.create(AppModule, {
    logger,
    bufferLogs: true,
  });

  app.flushLogs();

  const options = app.get<ConfigProperties>(ConfigProperties);
  const { port, host } = options.app;
  await app.listen(port, host);
}
bootstrap();
