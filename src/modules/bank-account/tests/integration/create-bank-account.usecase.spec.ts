import {
  CreateBankAccountResponse,
  CreateBankAccountUseCase,
} from '../../use-cases/create-bank-account/create-bank-account.usecase';
import { IBankAccountRepository } from '../../repositories/bank-account-repository.interface';
import { CreateBankAccountDTO } from '../../use-cases/create-bank-account/create-bank-account.DTO';
import { BankAccount } from '../../domain/bank-account';
import { CreateBankAccountErrors } from '../../use-cases/create-bank-account/create-bank-account.errors';

describe('CreateBankAccountUseCase Use-Case', () => {
  let useCase: CreateBankAccountUseCase;
  let mockRepository: jest.Mocked<IBankAccountRepository>;
  let mockBankAccount: BankAccount;

  beforeEach(() => {
    mockBankAccount = BankAccount.create({
      name: 'any_name',
      email: 'any@example.com',
      account: 12,
      agency: 1,
      accountDigit: 2,
    });
    mockRepository = {
      exists: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<IBankAccountRepository>;

    useCase = new CreateBankAccountUseCase(mockRepository);
  });

  it('should create a bank account', async () => {
    mockRepository.exists.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue(mockBankAccount);

    const request: CreateBankAccountDTO = {
      name: 'any_name',
      email: 'any@example.com',
    };
    const result: CreateBankAccountResponse = await useCase.execute(request);

    expect(result.isRight()).toBe(true);

    expect(mockRepository.exists).toHaveBeenCalledWith('any@example.com');
    expect(mockRepository.create).toHaveBeenCalled();
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'any_name',
        email: 'any@example.com',
      }),
    );
  });

  it('should return an error if bank account already exists', async () => {
    mockRepository.exists.mockResolvedValue(mockBankAccount);
    const request: CreateBankAccountDTO = {
      name: 'any_name',
      email: 'any@example.com',
    };
    const result: CreateBankAccountResponse = await useCase.execute(request);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(
      CreateBankAccountErrors.BankAccountAlreadyExistsError,
    );
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
