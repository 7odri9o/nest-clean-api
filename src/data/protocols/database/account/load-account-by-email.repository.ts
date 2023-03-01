import { Account } from '@/infra/database/mongodb/schemas';

export const LOAD_ACCOUNT_BY_EMAIL_REPOSITORY = Symbol(
  'LOAD_ACCOUNT_BY_EMAIL_REPOSITORY',
);

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<Account | null>;
}
