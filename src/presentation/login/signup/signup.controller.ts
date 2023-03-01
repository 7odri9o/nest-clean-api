import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
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
    try {
      const account = await this.addAccount.add(data);
      const accessToken = await this.authentication.auth({
        email: account.email,
        password: account.password,
      });
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
