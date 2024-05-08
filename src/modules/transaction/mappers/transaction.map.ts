import { TransactionHistory } from '@prisma/client';
import { Transaction } from '../domain/transaction';

export class TransactionMapper {
  static toDomain(raw: TransactionHistory): Transaction {
    const transactionOrError = Transaction.create(
      {
        customerId: raw.customerId,
        bankAccountId: raw.bankAccountId,
        type: raw.type,
        amount: +raw.amount,
        beforeBalance: +raw.beforeBalance,
        afterBalance: +raw.afterBalance,
        status: raw.status,
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
      customerId: transaction.customerId,
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
