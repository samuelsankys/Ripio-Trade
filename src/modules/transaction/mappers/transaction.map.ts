import { TransactionHistory } from '@prisma/client';
import { Transaction } from '../domain/transaction';
import { TransactionStatusEnum } from '../domain/transaction-status';
import { TransactionTypeEnum } from '../domain/transaction-type';
import { TransactionHistoryDTO } from '../dtos/transaction.DTO';

export class TransactionMapper {
  public static toDTO(transaction: Transaction): TransactionHistoryDTO {
    return {
      id: transaction.id,
      ...transaction.props,
    };
  }

  static toDomain(raw: TransactionHistory): Transaction {
    const transactionOrError = Transaction.create(
      {
        bankAccountId: raw.bankAccountId,
        type: raw.type as TransactionTypeEnum,
        amount: +raw.amount,
        beforeBalance: +raw.beforeBalance,
        afterBalance: +raw.afterBalance,
        status: raw.status as TransactionStatusEnum,
        transferId: raw.transferId,
        failingReason: raw.failingReason,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );

    return transactionOrError;
  }

  static toPersistence(transaction: Transaction) {
    return {
      id: transaction.id,
      bankAccountId: transaction.bankAccountId,
      type: transaction.type,
      amount: transaction.amount,
      beforeBalance: transaction.beforeBalance,
      afterBalance: transaction.afterBalance,
      status: transaction.status,
      transferId: transaction.transferId,
      failingReason: transaction.failingReason,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }
}
