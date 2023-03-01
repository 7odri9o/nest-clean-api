import {
  LoadAccountByEmailRepository,
  LOAD_ACCOUNT_BY_EMAIL_REPOSITORY,
} from '@/data/protocols/load-account-by-email.repository';
import { Account } from '@/infra/database/mongodb/schemas';
import { Test, TestingModule } from '@nestjs/testing';
import { DbAddAccount } from './db-add-account.usecase';

describe('DbAddAccount', () => {
  let loadAccountByEmailRepository: LoadAccountByEmailRepository;
  let module: TestingModule;
  let sut: DbAddAccount;

  beforeEach(async () => {
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
      ],
    }).compile();

    sut = module.get<DbAddAccount>(DbAddAccount);
    loadAccountByEmailRepository = module.get(LOAD_ACCOUNT_BY_EMAIL_REPOSITORY);
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
});
