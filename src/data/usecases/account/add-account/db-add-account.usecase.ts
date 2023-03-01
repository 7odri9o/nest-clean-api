import { AccountModel } from '@/domain/models';
import {
  AddAccount,
  AddAccountParams,
} from '@/domain/usecases/add-account.usecase';

export class DbAddAccount implements AddAccount {
  async add(params: AddAccountParams): Promise<AccountModel> {
    return null;
  }
}
