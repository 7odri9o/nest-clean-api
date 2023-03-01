import { AccountModel, AddAccountModel } from '@/domain/models';
import { AddAccount, ADD_ACCOUNT } from '@/domain/usecases/add-account.usecase';
import {
  AUTHENTICATION,
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/authentication.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './signup.controller';

describe('SignUpController', () => {
  let addAccount: AddAccount;
  let authentication: Authentication;
  let module: TestingModule;
  let sut: SignUpController;

  beforeEach(async () => {
    class AddAccountStub implements AddAccount {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async add(params: AddAccountModel): Promise<AccountModel> {
        return {
          name: 'any_name',
          email: 'any_email@email.com',
          password: 'any_password',
        };
      }
    }

    class AuthenticationStub implements Authentication {
      async auth(params: AuthenticationParams): Promise<string> {
        return 'any_token';
      }
    }

    module = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [
        {
          provide: ADD_ACCOUNT,
          useClass: AddAccountStub,
        },
        {
          provide: AUTHENTICATION,
          useClass: AuthenticationStub,
        },
      ],
    }).compile();

    sut = module.get<SignUpController>(SignUpController);
    addAccount = module.get(ADD_ACCOUNT);
    authentication = module.get(AUTHENTICATION);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call AddAccount with correct values', async () => {
    const addSpy = jest.spyOn(addAccount, 'add');

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    await sut.add(params);

    expect(addSpy).toHaveBeenCalledWith(params);
  });

  it('should throw if AddAccount throws', async () => {
    jest.spyOn(addAccount, 'add').mockRejectedValueOnce(new Error());

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    const promise = sut.add(params);

    expect(promise).rejects.toThrow();
  });

  it('should call Authentication with correct values', async () => {
    const authSpy = jest.spyOn(authentication, 'auth');

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    await sut.add(params);

    const expected = {
      email: 'any_email@email.com',
      password: 'any_password',
    };
    expect(authSpy).toHaveBeenCalledWith(expected);
  });

  it('should throw if Authentication throws', async () => {
    jest.spyOn(authentication, 'auth').mockRejectedValueOnce(new Error());

    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    const promise = sut.add(params);

    expect(promise).rejects.toThrow();
  });

  it('should return accessToken if called with correct values', async () => {
    const params = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };
    const authentication = await sut.add(params);

    expect(authentication).toHaveProperty('accessToken');
    expect(typeof authentication.accessToken).toBe('string');
  });
});
