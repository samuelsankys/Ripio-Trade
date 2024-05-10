import { CreateBankAccountErrors } from './create-bank-account.errors';
import { Either, left, right } from 'src/shared/application/either';
import { Injectable } from '@nestjs/common';
import { CreateBankAccountDTO } from './create-bank-account.DTO';
import { BankAccount } from '../../domain/bank-account';
import { IBankAccountRepository } from '../../repositories/bank-account-repository.interface';
import { BankAccountMapper } from '../../mappers/bank-account.map';
import { BankAccountDTO } from '../../dtos/bank-account.DTO';

export type CreateBankAccountResponse = Either<
  CreateBankAccountErrors.BankAccountAlreadyExistsError | Error,
  BankAccountDTO
>;

@Injectable()
export class CreateBankAccountUseCase {
  constructor(private readonly bankAccountRepo: IBankAccountRepository) {}

  public async execute(
    request: CreateBankAccountDTO,
  ): Promise<CreateBankAccountResponse> {
    const accountExists = await this.bankAccountRepo.exists(request.email);
    if (accountExists)
      return left(new CreateBankAccountErrors.BankAccountAlreadyExistsError());

    const bankAccountrOrError = BankAccount.create({
      name: request.name,
      email: request.email,
      account: 12,
      agency: 1,
      accountDigit: 2,
    });

    const account = await this.bankAccountRepo.create(bankAccountrOrError);
    const dto = BankAccountMapper.toDTO(account);
    return right(dto);
  }
}
