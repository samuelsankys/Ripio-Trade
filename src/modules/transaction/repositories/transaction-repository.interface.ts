import { Transaction } from '../domain/transaction';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<boolean>;
}
