import { AccountModel, AddAccountModel } from '@/domain/models';
import { AddAccount, ADD_ACCOUNT } from '@/domain/usecases/add-account.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './signup.controller';

describe('SignUpController', () => {
  let addAccount: AddAccount;
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

    module = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [
        {
          provide: ADD_ACCOUNT,
          useClass: AddAccountStub,
        },
      ],
    }).compile();

    sut = module.get<SignUpController>(SignUpController);
    addAccount = module.get(ADD_ACCOUNT);
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
});
