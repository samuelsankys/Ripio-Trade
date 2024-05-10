import { Transaction } from '../domain/transaction';

export abstract class ITransactionRepository {
  abstract create(transaction: Transaction): Promise<Transaction>;
  abstract transfer(
    sendTransfer: Transaction,
    receiverTransfer: Transaction,
  ): Promise<Transaction>;
  abstract filter(
    bankAccountId: string,
    options?: TransactionFilterOptions,
  ): Promise<Transaction[]>;
  abstract filterCount(
    bankAccountId: string,
    options: TransactionFilterOptions,
  ): Promise<number>;
}

export interface TransactionFilterOptions {
  fromDate?: Date;
  toDate?: Date;
  pageSize?: number;
  pageNumber?: number;
}
