import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddAccount, ADD_ACCOUNT } from '@/domain/usecases/add-account.usecase';
import { AddAccountDto } from './add-account.dto';
import {
  AUTHENTICATION,
  Authentication,
} from '@/domain/usecases/authentication.usecase';

@Controller('signup')
export class SignUpController {
  constructor(
    @Inject(ADD_ACCOUNT) private readonly addAccount: AddAccount,
    @Inject(AUTHENTICATION) private readonly authentication: Authentication,
  ) {}

  @Post()
  async add(@Body() data: AddAccountDto) {
    const account = await this.addAccount.add(data);
    await this.authentication.auth({
      email: account.email,
      password: account.password,
    });
  }
}
