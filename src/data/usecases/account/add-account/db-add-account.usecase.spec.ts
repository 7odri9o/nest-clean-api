import { Test, TestingModule } from '@nestjs/testing';
import { DbAddAccount } from './db-add-account.usecase';

describe('DbAddAccount', () => {
  let module: TestingModule;
  let sut: DbAddAccount;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [DbAddAccount],
    }).compile();

    sut = module.get<DbAddAccount>(DbAddAccount);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
