import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigProperties } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.flushLogs();

  const options = app.get<ConfigProperties>(ConfigProperties);
  const { port, host } = options.app;
  await app.listen(port, host);
}
bootstrap();
