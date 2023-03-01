import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigProperties } from './config';
import { InjectLog, LoggerModule } from './logger';
import { SignUpModule } from './modules/signup.module';

@Module({
  imports: [ConfigModule, LoggerModule.forRootAsync(), SignUpModule],
})
export class AppModule implements NestModule {
  constructor(
    private readonly config: ConfigProperties,
    @InjectLog() private readonly logger: Logger,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  configure(consumer: MiddlewareConsumer) {}

  onModuleInit() {
    this.logger.log('Initializing %s...', AppModule.name);
    this.logger.debug('Application config: %o', this.config);

    if (this.logger.localInstance.setLogLevels) {
      this.logger.localInstance.setLogLevels(this.config.logging.levels);
    }
  }
}
