import { AccountModel } from '@/domain/models';

export const ADD_ACCOUNT = Symbol('ADD_ACCOUNT');

export class AddAccountParams {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add(params: AddAccountParams): Promise<AccountModel>;
}
