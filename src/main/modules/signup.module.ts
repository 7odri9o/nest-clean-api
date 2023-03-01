import { SignUpController } from '@/presentation/login/signup/signup.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SignUpController],
})
export class SignUpModule {}
