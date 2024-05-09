import { MakeWithDrawalErrors } from './make-withdrawal.errors';
import { Either, left, right } from 'src/shared/application/either';
import { Injectable } from '@nestjs/common';
import { MakeWithDrawalDTO } from './make-withdrawal.DTO';
import { IBankAccountRepository } from 'src/modules/bank-account/repositories/bank-account-repository.interface';
import { ITransactionRepository } from '../../repositories/transaction-repository.interface';
import { Transaction } from '../../domain/transaction';
import { TransactionStatusEnum } from '../../domain/transaction-status';
import { TransactionTypeEnum } from '../../domain/transaction-type';
import { TransactionMapper } from '../../mappers/transaction.map';
import { TransactionHistoryDTO } from '../../dtos/transaction.DTO';

export type MakeWithDrawalResponse = Either<
  MakeWithDrawalErrors.BankAccountNotExistsError | Error,
  TransactionHistoryDTO
>;

@Injectable()
export class MakeWithDrawalUseCase {
  constructor(
    private readonly bankAccountRepo: IBankAccountRepository,
    private readonly transactionRepo: ITransactionRepository,
  ) {}

  public async execute(
    request: MakeWithDrawalDTO,
  ): Promise<MakeWithDrawalResponse> {
    const accountExists = await this.bankAccountRepo.findById(
      request.bankAccountId,
    );
    if (!accountExists)
      return left(new MakeWithDrawalErrors.BankAccountNotExistsError());
    const withdrawalOrError = accountExists.withdrawal(request.value);
    if (withdrawalOrError.isLeft()) return left(withdrawalOrError.value);

    const transaction = Transaction.create({
      bankAccountId: request.bankAccountId,
      type: TransactionTypeEnum.Withdrawal,
      status: TransactionStatusEnum.COMPLETED,
      amount: -request.value,
      afterBalance: accountExists.getAfterOperationBalance(),
      beforeBalance: accountExists.getBeforeOperationBalance(),
    });

    await this.bankAccountRepo.update(accountExists);
    const result = await this.transactionRepo.create(transaction);
    const dto = TransactionMapper.toDTO(result);
    return right(dto);
  }
}
