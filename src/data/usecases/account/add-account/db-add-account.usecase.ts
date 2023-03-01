import {
  LOAD_ACCOUNT_BY_EMAIL_REPOSITORY,
  LoadAccountByEmailRepository,
} from '@/data/protocols/load-account-by-email.repository';
import { AccountModel } from '@/domain/models';
import {
  AddAccount,
  AddAccountParams,
} from '@/domain/usecases/add-account.usecase';
import { Inject } from '@nestjs/common';

export class DbAddAccount implements AddAccount {
  constructor(
    @Inject(LOAD_ACCOUNT_BY_EMAIL_REPOSITORY)
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const account = await await this.loadAccountByEmailRepository.loadByEmail(
      params.email,
    );
    if (account) {
      return null;
    }

    return null;
  }
}
