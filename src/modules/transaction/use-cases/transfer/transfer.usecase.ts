import { TransferErrors } from './transfer.errors';
import { Either, left, right } from 'src/shared/application/either';
import { Injectable } from '@nestjs/common';
import { TransferDTO } from './transfer.DTO';
import { IBankAccountRepository } from 'src/modules/bank-account/repositories/bank-account-repository.interface';
import { ITransactionRepository } from '../../repositories/transaction-repository.interface';
import { Transaction } from '../../domain/transaction';
import { TransactionStatusEnum } from '../../domain/transaction-status';
import { TransactionTypeEnum } from '../../domain/transaction-type';
import { TransactionMapper } from '../../mappers/transaction.map';
import { TransactionHistoryDTO } from '../../dtos/transaction.DTO';

export type TransferResponse = Either<
  | TransferErrors.BankAccountNotExistsError
  | TransferErrors.EmailNotFoundError
  | Error,
  TransactionHistoryDTO
>;

@Injectable()
export class TransferUseCase {
  constructor(
    private readonly bankAccountRepo: IBankAccountRepository,
    private readonly transactionRepo: ITransactionRepository,
  ) {}

  public async execute(request: TransferDTO): Promise<TransferResponse> {
    const [accountExists, receiverExists] = await Promise.all([
      this.bankAccountRepo.findById(request.bankAccountId),
      this.bankAccountRepo.exists(request.toEmail),
    ]);
    if (!accountExists)
      return left(new TransferErrors.BankAccountNotExistsError());
    if (!receiverExists) return left(new TransferErrors.EmailNotFoundError());

    const withdrawalOrError = accountExists.withdrawal(request.value);
    if (withdrawalOrError.isLeft()) return left(withdrawalOrError.value);
    receiverExists.deposit(request.value);

    const sendTransfer = Transaction.create({
      bankAccountId: accountExists.id,
      type: TransactionTypeEnum.Transfer,
      status: TransactionStatusEnum.COMPLETED,
      amount: -request.value,
      afterBalance: accountExists.getAfterOperationBalance(),
      beforeBalance: accountExists.getBeforeOperationBalance(),
    });

    const receiverTransfer = Transaction.create({
      bankAccountId: receiverExists.id,
      type: TransactionTypeEnum.Transfer,
      status: TransactionStatusEnum.COMPLETED,
      amount: request.value,
      afterBalance: receiverExists.getAfterOperationBalance(),
      beforeBalance: receiverExists.getBeforeOperationBalance(),
      transferId: sendTransfer.id,
    });

    const result = await this.transactionRepo.transfer(
      sendTransfer,
      receiverTransfer,
    );

    const dto = TransactionMapper.toDTO(result);
    return right(dto);
  }
}
