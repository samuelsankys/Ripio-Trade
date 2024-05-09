import { Transaction } from '../domain/transaction';

export abstract class ITransactionRepository {
  abstract create(transaction: Transaction): Promise<Transaction>;
  abstract transfer(
    sendTransfer: Transaction,
    receiverTransfer: Transaction,
  ): Promise<Transaction>;
}
