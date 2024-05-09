import { MakeDepositErrors } from './make-deposit.errors';
import { Either, left, right } from 'src/shared/application/either';
import { Injectable } from '@nestjs/common';
import { MakeDepositDTO } from './make-deposit.DTO';
import { IBankAccountRepository } from 'src/modules/bank-account/repositories/bank-account-repository.interface';
import { ITransactionRepository } from '../../repositories/transaction-repository.interface';
import { Transaction } from '../../domain/transaction';
import { TransactionStatusEnum } from '../../domain/transaction-status';
import { TransactionTypeEnum } from '../../domain/transaction-type';
import { TransactionMapper } from '../../mappers/transaction.map';
import { TransactionHistoryDTO } from '../../dtos/transaction.DTO';

export type MakeDepositResponse = Either<
  MakeDepositErrors.BankAccountNotExistsError | Error,
  TransactionHistoryDTO
>;

@Injectable()
export class MakeDepositUseCase {
  constructor(
    private readonly bankAccountRepo: IBankAccountRepository,
    private readonly transactionRepo: ITransactionRepository,
  ) {}

  public async execute(request: MakeDepositDTO): Promise<MakeDepositResponse> {
    const accountExists = await this.bankAccountRepo.findById(
      request.bankAccountId,
    );

    if (!accountExists)
      return left(new MakeDepositErrors.BankAccountNotExistsError());
    accountExists.deposit(request.value);

    const transaction = Transaction.create({
      bankAccountId: request.bankAccountId,
      type: TransactionTypeEnum.Deposit,
      status: TransactionStatusEnum.COMPLETED,
      amount: request.value,
      afterBalance: accountExists.getAfterOperationBalance(),
      beforeBalance: accountExists.getBeforeOperationBalance(),
    });

    await this.bankAccountRepo.update(accountExists);
    const result = await this.transactionRepo.create(transaction);
    const dto = TransactionMapper.toDTO(result);
    return right(dto);
  }
}
