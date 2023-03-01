import { AccountModel, AddAccountModel } from '@/domain/models';

export const ADD_ACCOUNT = Symbol('ADD_ACCOUNT');

export interface AddAccount {
  add(params: AddAccountModel): Promise<AccountModel>;
}
