import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigProperties } from './config';

@Module({
  imports: [ConfigModule],
})
export class AppModule implements NestModule {
  constructor(private readonly config: ConfigProperties) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  configure(consumer: MiddlewareConsumer) {}
}
