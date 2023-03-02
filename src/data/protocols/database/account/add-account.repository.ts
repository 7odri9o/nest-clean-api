import { Account } from '@/infra/database/mongodb/schemas';
import { AddAccountParams } from '@/domain/usecases/add-account.usecase';

export const ADD_ACCOUNT_REPOSITORY = Symbol('ADD_ACCOUNT_REPOSITORY');

export interface AddAccountRepository {
  add: (data: AddAccountParams) => Promise<Account>;
}
