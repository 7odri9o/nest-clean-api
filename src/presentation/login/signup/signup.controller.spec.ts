import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './signup.controller';

describe('SignUpController', () => {
  let sut: SignUpController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [SignUpController],
    }).compile();

    sut = module.get<SignUpController>(SignUpController);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
