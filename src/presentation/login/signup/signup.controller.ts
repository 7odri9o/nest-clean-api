import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddAccount, ADD_ACCOUNT } from '@/domain/usecases/add-account.usecase';
import { AddAccountDto } from './add-account.dto';

@Controller('signup')
export class SignUpController {
  constructor(@Inject(ADD_ACCOUNT) private readonly addAccount: AddAccount) {}

  @Post()
  async add(@Body() data: AddAccountDto) {
    await this.addAccount.add(data);
  }
}
