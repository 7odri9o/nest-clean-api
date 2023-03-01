import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account.usecase';
import { ADD_ACCOUNT } from '@/domain/usecases/add-account.usecase';
import { SignUpController } from '@/presentation/login/signup/signup.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/main/database';

@Module({
  controllers: [SignUpController],
  imports: [DatabaseModule],
  providers: [
    {
      provide: ADD_ACCOUNT,
      useClass: DbAddAccount,
    },
  ],
})
export class SignUpModule {}
