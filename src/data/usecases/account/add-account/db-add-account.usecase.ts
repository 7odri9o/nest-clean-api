import {
  HASHER_ADAPTER,
  HasherAdapter,
} from '@/data/protocols/criptography/hasher.dapter';
import {
  LOAD_ACCOUNT_BY_EMAIL_REPOSITORY,
  LoadAccountByEmailRepository,
} from '@/data/protocols/database/account/load-account-by-email.repository';
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
    @Inject(HASHER_ADAPTER)
    private readonly hasherAdapter: HasherAdapter,
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const account = await await this.loadAccountByEmailRepository.loadByEmail(
      params.email,
    );
    if (account) {
      return null;
    }

    const hashedPassword = await this.hasherAdapter.hash(params.password);

    return null;
  }
}
