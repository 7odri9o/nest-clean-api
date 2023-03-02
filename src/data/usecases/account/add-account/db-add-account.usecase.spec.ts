import {
  AddAccountRepository,
  ADD_ACCOUNT_REPOSITORY,
} from '@/data/protocols/database/account/add-account.repository';
import {
  HasherAdapter,
  HASHER_ADAPTER,
} from '@/data/protocols/criptography/hasher.dapter';
import {
  LoadAccountByEmailRepository,
  LOAD_ACCOUNT_BY_EMAIL_REPOSITORY,
} from '@/data/protocols/database/account/load-account-by-email.repository';
import { AddAccountParams } from '@/domain/usecases/add-account.usecase';
import { Account } from '@/infra/database/mongodb/schemas';
import { Test, TestingModule } from '@nestjs/testing';
import { DbAddAccount } from './db-add-account.usecase';

describe('DbAddAccount', () => {
  let addAccountRepository: AddAccountRepository;
  let hasherAdapter: HasherAdapter;
  let loadAccountByEmailRepository: LoadAccountByEmailRepository;
  let module: TestingModule;
  let sut: DbAddAccount;

  beforeEach(async () => {
    class AddAccountRepositoryStub implements AddAccountRepository {
      async add(data: AddAccountParams): Promise<Account> {
        return null;
      }
    }

    class HasherAdapterStub implements HasherAdapter {
      async hash(value: string): Promise<string> {
        return 'hashed_value';
      }
    }

    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async loadByEmail(email: string): Promise<Account> {
        return null;
      }
    }

    module = await Test.createTestingModule({
      providers: [
        DbAddAccount,
        {
          provide: LOAD_ACCOUNT_BY_EMAIL_REPOSITORY,
          useClass: LoadAccountByEmailRepositoryStub,
        },
        {
          provide: HASHER_ADAPTER,
          useClass: HasherAdapterStub,
        },
        {
          provide: ADD_ACCOUNT_REPOSITORY,
          useClass: AddAccountRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<DbAddAccount>(DbAddAccount);
    loadAccountByEmailRepository = module.get(LOAD_ACCOUNT_BY_EMAIL_REPOSITORY);
    hasherAdapter = module.get(HASHER_ADAPTER);
    addAccountRepository = module.get(ADD_ACCOUNT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call LoadAccountByEmailRepository with correct value', async () => {
    const loadByEmailSpy = jest.spyOn(
      loadAccountByEmailRepository,
      'loadByEmail',
    );

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    await sut.add(params);

    const expected = 'any_email@email.com';
    expect(loadByEmailSpy).toHaveBeenCalledWith(expected);
  });

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    jest
      .spyOn(loadAccountByEmailRepository, 'loadByEmail')
      .mockRejectedValueOnce(new Error());

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    const promise = sut.add(params);

    expect(promise).rejects.toThrow();
  });

  test('should return null if LoadAccountByEmailRepository not returns null', async () => {
    jest
      .spyOn(loadAccountByEmailRepository, 'loadByEmail')
      .mockResolvedValueOnce({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'hashed_password',
      });

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    const account = await sut.add(params);

    expect(account).toBe(null);
  });

  it('should call Hasher with correct value', async () => {
    const hashSpy = jest.spyOn(hasherAdapter, 'hash');

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    await sut.add(params);

    const expected = 'any_password';
    expect(hashSpy).toHaveBeenCalledWith(expected);
  });

  it('should throw if HasherAdapter throws', async () => {
    jest.spyOn(hasherAdapter, 'hash').mockRejectedValueOnce(new Error());

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    const promise = sut.add(params);

    expect(promise).rejects.toThrow();
  });

  it('should call AddAccountRepository with correct value', async () => {
    const addSpy = jest.spyOn(addAccountRepository, 'add');

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    await sut.add(params);

    const expected = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'hashed_value',
    };
    expect(addSpy).toHaveBeenCalledWith(expected);
  });
});
